import { Inject, Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { Db, MongoServerError } from 'mongodb';
import {
  crudDbConnectionFactory,
} from '../utils/utils';
import { GetEndpointByURLUsecase } from 'libs/endpoints-be/src/lib/usecases/get-endpoint-by-url.usecase';
import { dbConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';
import { CRUDActionExecutorUsecase } from './crud-action-executor.usecase';
import { CoreEngineProcessingException, CRUDActionResponse, PlaceholderDataSource } from '@api-assistant/crud-engine-core';
import { VariableValuePopulaterService } from '../services/variable-value-populater.service';

interface CoreEngineCRUDUsecaseInput {
  url: string;
  placeholderDataSouce: PlaceholderDataSource
}

@Injectable()
export class CoreEngineCRUDUsecase
  implements Usecase<CoreEngineCRUDUsecaseInput, CRUDActionResponse>
{
  private logger = new Logger(CoreEngineCRUDUsecase.name);

  private readonly variableValuePopulater = new VariableValuePopulaterService();

  constructor(
    private readonly getEndpointByURL: GetEndpointByURLUsecase,
    @Inject(dbConfig.KEY) private databaseConfig: ConfigType<typeof dbConfig>,
    private readonly crudActionExecutorUsecase: CRUDActionExecutorUsecase
  ) {}

  async execute(input: CoreEngineCRUDUsecaseInput): Promise<CRUDActionResponse> {
      const { url, placeholderDataSouce } = input;
      const endpoint = await this.getEndpointByURL.execute(url);
      if (!endpoint) {
        throw new Error('Endpoint not found for the URL ' + endpoint);
      }

      const { crud, response, applicationId: applicationObjectId } = endpoint;

      const applicationId = applicationObjectId.toString();

      this.logger.log('Handling core engine CRUD');
      const { connection: mongoConnection, db } = await crudDbConnectionFactory(
        applicationId,
        this.databaseConfig.DB_URL
      );
      this.logger.log(`OPENED CONNECTION`)
    try {
      let stepsResponse: Document[] = []
      for (const action of crud) {
        this.logger.log('processing step', action)
        let payloadPlaceholdersPopulatedWithValues = this.variableValuePopulater.replaceVariables(action.payload, {
          ...placeholderDataSouce,
          crudSteps: stepsResponse
        });
        let currentStepResponse = await this.crudActionExecutorUsecase.execute({
          db, 
          actionDef: {
            collectionName: action.collectionName,
            payload: payloadPlaceholdersPopulatedWithValues as Document,
            operation: action.operation
          }
        })
        stepsResponse = [...stepsResponse, currentStepResponse as Document]
        this.logger.log('processed current step', currentStepResponse);
      }
      this.logger.log('Processed the operations');
      this.logger.log('Computed CRUD: ', placeholderDataSouce.crudSteps);
      mongoConnection.close();
      this.logger.log(`Core engine db ${applicationId} connection closed`);
      return this.variableValuePopulater.replaceVariables(response, {...placeholderDataSouce, crudSteps: stepsResponse}) as CRUDActionResponse;
    } catch (err) {
      console.error(err);
      mongoConnection.close();
      this.logger.log('CONNECTION CLOSED')
      if (err instanceof MongoServerError)
        throw new CoreEngineProcessingException();
      else throw err;
    }
  }

}
