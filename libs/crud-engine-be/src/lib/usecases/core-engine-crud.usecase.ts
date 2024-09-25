import { Inject, Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { Collection, Db, MongoServerError } from 'mongodb';
import {
  CoreEngineFindActionPayloadMissingException,
  CoreEngineInsertManyActionInvalidDataException,
  CoreEngineProcessingException,
  CoreEngineUnSupportedActionException,
  CoreEngineUpdateActionPayloadMissingException,
} from '../core-engine.exceptions';
import {
  crudDbConnectionFactory,
  resolveObjectVariable,
  resolveRequestVariable,
  resolveStepVariable,
  resolveSystemVariable,
  resolveVariableType,
} from '../utils';
import {
  ALLOWED_DB_OPERATIONS_IN_ENDPOINT,
  EndpointActionDefinition,
  EndpointCreateActionQuery,
  EndpointDeleteActionQuery,
  EndpointReadActionQuery,
  EndpointResponse,
  EndpointUpdateActionQuery,
} from '@api-assistant/endpoints-be';
import { GetEndpointByURLUsecase } from 'libs/endpoints-be/src/lib/usecases/get-endpoint-by-url.usecase';
import { dbConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';
import { CRUDSupportedVariablesInfo } from '../types';

interface CoreEngineCRUDUsecaseInput {
  url: string;
  reqBody: Object;
}

@Injectable()
export class CoreEngineCRUDUsecase
  implements Usecase<CoreEngineCRUDUsecaseInput, EndpointResponse>
{
  private logger = new Logger(CoreEngineCRUDUsecase.name);

  constructor(
    private readonly getEndpointByURL: GetEndpointByURLUsecase,
    @Inject(dbConfig.KEY) private databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(input: CoreEngineCRUDUsecaseInput): Promise<EndpointResponse> {
    try {
      const { url, reqBody } = input;
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

      const crudResponse: any[] = [];
      for (const operation of crud) {
        crudResponse.push(
          await this.performCRUD(
            {
              ...operation,
              payload: this.replaceVariables(operation.payload, {
                crudResponseArr: crudResponse,
                reqBody,
              }),
            },
            db
          )
        );
        this.logger.log('processed' + operation.action);
      }
      this.logger.log('Processed the operations');
      this.logger.log('Computed CRUD: ', crudResponse);
      mongoConnection.close();
      this.logger.log(`Core engine db ${applicationId} connection closed`);
      return this.replaceVariables(response, {
        crudResponseArr: crudResponse,
        reqBody,
      });
    } catch (err) {
      console.error(err);
      if (err instanceof MongoServerError)
        throw new CoreEngineProcessingException();
      else throw err;
    }
  }

  private async performCRUD(
    operation: EndpointActionDefinition,
    db: Db
  ): Promise<unknown> {
    const collection = db.collection(operation.collectionName);
    this.logger.log(`connected to collection: ${operation.collectionName}`);
    switch (operation.action) {
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne: {
        return this.deleteOne(
          collection,
          operation.payload as EndpointDeleteActionQuery
        );
      }

      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany: {
        return this.deleteMany(
          collection,
          operation.payload as EndpointDeleteActionQuery
        );
      }

      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne: {
        return this.findOne(
          collection,
          operation.payload as EndpointReadActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find: {
        return this.find(
          collection,
          operation.payload as EndpointReadActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne: {
        return this.insertOne(
          collection,
          operation.payload as EndpointCreateActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany: {
        return this.insertMany(
          collection,
          operation.payload as EndpointCreateActionQuery[]
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne: {
        return this.updateOne(
          collection,
          operation.payload as EndpointUpdateActionQuery
        );
      }
      default: {
        throw new CoreEngineUnSupportedActionException(operation.action);
      }
    }
  }

  private deleteOne(
    collection: Collection,
    payload: EndpointDeleteActionQuery
  ) {
    this.logger.log('Performing delete one');
    if (!payload.filter) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.deleteOne(payload.filter);
  }

  private deleteMany(
    collection: Collection,
    payload: EndpointDeleteActionQuery
  ) {
    this.logger.log('Performing delete many');
    if (!payload.filter) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.deleteMany(payload.filter);
  }

  private findOne(collection: Collection, payload: EndpointReadActionQuery) {
    this.logger.log('Performing findOne');
    if (!payload.filter || !payload.options) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.findOne(payload.filter, payload.options);
  }

  private find(collection: Collection, payload: EndpointReadActionQuery) {
    this.logger.log('Performing find');
    if (!payload.filter || !payload.options) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.find(payload.filter, payload.options).toArray();
  }

  private insertOne(
    collection: Collection,
    payload: EndpointCreateActionQuery
  ) {
    this.logger.log('Performing insertOne');
    return collection.insertOne({
      ...payload,
    });
  }

  private insertMany(
    collection: Collection,
    payload: EndpointCreateActionQuery[]
  ) {
    if (!Array.isArray(payload)) {
      throw new CoreEngineInsertManyActionInvalidDataException();
    }
    this.logger.log('Performing insertMany');
    return collection.insertMany(payload);
  }

  private updateOne(
    collection: Collection,
    payload: EndpointUpdateActionQuery
  ) {
    this.logger.log('Performing updateOne');
    if (!payload.filter || !payload.patch) {
      throw new CoreEngineUpdateActionPayloadMissingException();
    }
    return collection.updateOne(payload.filter, payload.patch);
  }

  private replaceVariables(
    payload: any,
    inputs: {
      crudResponseArr: any;
      reqBody: any;
    }
  ): any {
    const { crudResponseArr, reqBody } = inputs;
    if (Array.isArray(payload)) {
      const replacedVariablesInArr: unknown[] = [];
      payload.forEach((payloadArrayEle) => {
        const processedArrayEle = this.replaceVariables(
          payloadArrayEle,
          crudResponseArr
        );
        replacedVariablesInArr.push(processedArrayEle);
      });
      this.logger.log(
        'completed processing array type ' +
          JSON.stringify(replacedVariablesInArr)
      );
      return replacedVariablesInArr;
    } else if (typeof payload === 'object') {
      const replacedVariablesInObject: Record<string, unknown> = {};
      Object.keys(payload).forEach((key) => {
        replacedVariablesInObject[key] = this.replaceVariables(payload[key], {
          crudResponseArr: crudResponseArr,
          reqBody,
        });
        this.logger.log(
          `processed object value key ${key} ` +
            JSON.stringify(replacedVariablesInObject[key])
        );
      });
      this.logger.log(
        'processed entire object type ' +
          JSON.stringify(replacedVariablesInObject)
      );
      return replacedVariablesInObject;
    }

    const primitiveValue: unknown = payload;
    this.logger.log(
      `found primitive value ${primitiveValue} with type ${typeof primitiveValue}`
    );

    if (typeof primitiveValue !== 'string') {
      return primitiveValue;
    }
    const crudVariableType = resolveVariableType(primitiveValue, this.logger);
    switch (crudVariableType) {
      case 'Request': {
        const requestBodyVariable = resolveRequestVariable(primitiveValue, reqBody, this.logger);
        if(resolveVariableType(requestBodyVariable as unknown as string, this.logger) === "ObjectId") {
          return resolveObjectVariable(requestBodyVariable as unknown as string, this.logger)
        }
        return requestBodyVariable;
      }
      case 'System': {
        return resolveSystemVariable(primitiveValue, this.logger);
      }
      case 'ObjectId': {
        return resolveObjectVariable(primitiveValue, this.logger);
      }
      case 'Steps': {
        return resolveStepVariable(
          primitiveValue,
          this.logger,
          crudResponseArr
        );
      }
      default: {
        return primitiveValue;
      }
    }
    return primitiveValue;
  }
}
