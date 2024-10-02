import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { MongoClient, MongoServerError, ObjectId } from 'mongodb';
import { CRUDActionExecutorUsecase } from './crud-action-executor.usecase';
import {
  CoreEngineProcessingException,
  CRUDActionResponse,
  CRUDEngineHttpMethods,
  PlaceholderDataSource,
  RequestDataValidation,
} from '@api-assistant/crud-engine-core';
import { VariableValuePopulaterService } from '../services/variable-value-populater.service';
import { RequestDataValidatorFacadeService } from './request-data-validator-facade.service';
import { FindEndpointByPathMatchUsecase } from '@api-assistant/endpoints-be';
import { ParamsParserService } from './params-parser.service';
import { AuthenticateAppUserUsecase } from './authenticate-app-user.usecase';
import { CRUD_DB_CONNECTION } from '../utils/utils';

export interface CoreEngineCRUDUsecaseInput {
  url: string;
  placeholderDataSouce: Omit<PlaceholderDataSource, 'crudSteps' | 'authUser'>;
  applicationId: ObjectId;
  method: CRUDEngineHttpMethods;
  token?: string
}

@Injectable()
export class CoreEngineCRUDUsecase
  implements Usecase<CoreEngineCRUDUsecaseInput, CRUDActionResponse>
{
  private logger = new Logger(CoreEngineCRUDUsecase.name);

  private readonly variableValuePopulater = new VariableValuePopulaterService();

  constructor(
    @Inject(CRUD_DB_CONNECTION) private dbConnection: MongoClient,
    private readonly crudActionExecutorUsecase: CRUDActionExecutorUsecase,
    private readonly requestDataValidatorService: RequestDataValidatorFacadeService,
    private readonly findEndpointByPathMatching: FindEndpointByPathMatchUsecase,
    private readonly paramsParserService: ParamsParserService,
    private readonly authenticateAppUser: AuthenticateAppUserUsecase
  ) {}

  async execute(
    input: CoreEngineCRUDUsecaseInput
  ): Promise<CRUDActionResponse> {

    const { url, placeholderDataSouce: requestPlaceholderSource, applicationId, token } = input;

    const placeholderDataSouce: PlaceholderDataSource = {
      ...requestPlaceholderSource,
      crudSteps: [],
      authUser: null
    }

    const matchedEndpoint = await this.findEndpointByPathMatching.execute({
      applicationId: input.applicationId,
      url: input.url,
      method: input.method
    });
    if (!matchedEndpoint) {
      throw new HttpException('Endpoint not found for the URL:' + url, 400);
    }

    const { endpoint, params } = matchedEndpoint;

    this.logger.log('Handling core engine CRUD');

    const db = this.dbConnection.db(`api-crud-${applicationId.toString()}`);

    if(endpoint.isAuthenticated) {
      placeholderDataSouce.authUser = await this.authenticateAppUser.execute({ db, token: token || '' })
    }
    
    this.logger.log('found auth user', placeholderDataSouce.authUser);

    placeholderDataSouce.pathParams = this.paramsParserService.parse(params);
    placeholderDataSouce.queryParams = this.paramsParserService.parse(placeholderDataSouce.queryParams as Record<string, string>);

    const {
      crud,
      response,
      validations,
    } = endpoint;

    try {
      await this.requestDataValidatorService.validate({
        db,
        requestData: placeholderDataSouce,
        validations: this.variableValuePopulater.replaceVariables(
          validations,
          placeholderDataSouce
        ) as RequestDataValidation,
      });
      let stepsResponse: Document[] = [];
      for (const action of crud) {
        this.logger.log('processing step', action);
        let payloadPlaceholdersPopulatedWithValues =
          this.variableValuePopulater.replaceVariables(action.payload, {
            ...placeholderDataSouce,
            crudSteps: stepsResponse,
          });
        let currentStepResponse = await this.crudActionExecutorUsecase.execute({
          db,
          actionDef: {
            collectionName: action.collectionName,
            payload: payloadPlaceholdersPopulatedWithValues as Document,
            operation: action.operation,
          },
        });
        stepsResponse = [...stepsResponse, currentStepResponse as Document];
        this.logger.log('processed current step', currentStepResponse);
      }
      this.logger.log('Processed the operations');
      this.logger.log('Computed CRUD: ', placeholderDataSouce.crudSteps);
      return this.variableValuePopulater.replaceVariables(response, {
        ...placeholderDataSouce,
        crudSteps: stepsResponse,
      }) as CRUDActionResponse;
    } catch (err) {
      console.error(err);
      if (err instanceof MongoServerError)
        throw new CoreEngineProcessingException();
      else throw err;
    }
  }
}
