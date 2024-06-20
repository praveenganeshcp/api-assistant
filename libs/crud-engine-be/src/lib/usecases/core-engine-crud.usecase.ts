import { Inject, Injectable, Logger } from '@nestjs/common';
import { Usecase, valueIsDefined } from '@api-assistant/commons-be';
import { Collection, Db, MongoServerError, ObjectId } from 'mongodb';
import {
  CoreEngineFindActionPayloadMissingException,
  CoreEngineInsertManyActionInvalidDataException,
  CoreEngineInvalidVariablePathException,
  CoreEngineProcessingException,
  CoreEngineUnSupportedActionException,
  CoreEngineUpdateActionPayloadMissingException,
} from '../core-engine.exceptions';
import { crudDbConnectionFactory } from '../utils';
import { ProjectMetadataRepository } from '@api-assistant/projects-be';
import {
  ALLOWED_DB_OPERATIONS_IN_ENDPOINT,
  EndpointActionDefinition,
  EndpointActionQuery,
  EndpointCreateActionQuery,
  EndpointDeleteActionQuery,
  EndpointReadActionQuery,
  EndpointResponse,
  EndpointUpdateActionQuery,
} from '@api-assistant/endpoints-be';
import { GetEndpointByURLUsecase } from 'libs/endpoints-be/src/lib/usecases/get-endpoint.usecase';
import { dbConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CoreEngineCRUDUsecase
  implements Usecase<string, EndpointResponse>
{
  private logger = new Logger(CoreEngineCRUDUsecase.name);

  constructor(
    private projectMetadataRepo: ProjectMetadataRepository,
    private readonly getEndpointByURL: GetEndpointByURLUsecase,
    @Inject(dbConfig.KEY) private databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(endpointUrl: string): Promise<EndpointResponse> {
    try {
      const endpoint = await this.getEndpointByURL.execute(endpointUrl);
      if (!endpoint) {
        throw new Error('Endpoint not found for the URL ' + endpoint);
        return;
      }
      const { crud, response, projectId: projectObjectId } = endpoint;

      const projectId = projectObjectId.toString();

      this.logger.log('Handling core engine CRUD');
      const { connection: mongoConnection, db } = await crudDbConnectionFactory(
        projectId,
        this.databaseConfig.DB_URL
      );

      const crudResponse: any[] = [];
      for (const operation of crud) {
        crudResponse.push(
          await this.performCRUD(
            projectId,
            {
              ...operation,
              payload: this.replaceVariables(operation.payload, crudResponse),
            },
            db
          )
        );
        this.logger.log('processed' + operation.action);
      }
      this.logger.log('Processed the operations');
      this.logger.log('Computed CRUD: ', crudResponse);
      mongoConnection.close();
      this.logger.log(`Core engine db ${projectId} connection closed`);
      return this.replaceVariables(response, crudResponse);
    } catch (err) {
      console.error(err);
      if (err instanceof MongoServerError)
        throw new CoreEngineProcessingException();
      else throw err;
    }
  }

  private async performCRUD(
    projectId: string,
    operation: EndpointActionDefinition,
    db: Db
  ): Promise<unknown> {
    const collection = db.collection(operation.collectionName);
    this.logger.log(`connected to collection: ${operation.collectionName}`);
    switch (operation.action) {
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteOne: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.deleteAction': 1 } }
        );
        return this.deleteOne(
          collection,
          operation.payload as EndpointDeleteActionQuery
        );
      }

      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.deleteMany: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.deleteAction': 1 } }
        );
        return this.deleteMany(
          collection,
          operation.payload as EndpointDeleteActionQuery
        );
      }

      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.readAction': 1 } }
        );
        return this.findOne(
          collection,
          operation.payload as EndpointReadActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.find: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.readAction': 1 } }
        );
        return this.find(
          collection,
          operation.payload as EndpointReadActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.createAction': 1 } }
        );
        return this.insertOne(
          collection,
          operation.payload as EndpointCreateActionQuery
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertMany: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.createAction': 1 } }
        );
        return this.insertMany(
          collection,
          operation.payload as EndpointCreateActionQuery[]
        );
      }
      case ALLOWED_DB_OPERATIONS_IN_ENDPOINT.updateOne: {
        await this.projectMetadataRepo.updateOne(
          { projectId: new ObjectId(projectId) },
          { $inc: { 'count.updateAction': 1 } }
        );
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

  private replaceVariables(payload: any, crudResponseArr: any): any {
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
        'completed processing array type' +
          JSON.stringify(replacedVariablesInArr)
      );
      return replacedVariablesInArr;
    } else if (typeof payload === 'object') {
      const replacedVariablesInObject: Record<string, unknown> = {};
      Object.keys(payload).forEach((key) => {
        replacedVariablesInObject[key] = this.replaceVariables(
          payload[key],
          crudResponseArr
        );
        this.logger.log(
          'processed object value' +
            JSON.stringify(replacedVariablesInObject[key])
        );
      });
      this.logger.log(
        'processed object type' + JSON.stringify(replacedVariablesInObject)
      );
      return replacedVariablesInObject;
    }
    const value: unknown = payload;
    this.logger.log('found primitive value', value);
    const variablePrefix = '${result';
    const variableSuffix = '}';
    const variablePrefixLen = variablePrefix.length;
    if (
      typeof value === 'string' &&
      value.startsWith(variablePrefix) &&
      value.endsWith(variableSuffix)
    ) {
      this.logger.log('processing variable' + value);
      const valueKey: string = value.slice(variablePrefixLen, value.length - 1);
      const valueKeyArr = valueKey.split('.').slice(1);
      this.logger.log('found variable paths' + JSON.stringify(valueKeyArr));
      let nestedval = crudResponseArr;
      for (const key of valueKeyArr) {
        if (!valueIsDefined(nestedval[key])) {
          throw new CoreEngineInvalidVariablePathException(value);
        }
        this.logger.log(
          `found nested value for key ${key}` + JSON.stringify(nestedval[key])
        );
        nestedval = nestedval[key];
      }
      this.logger.log(
        `Found value or variable ${value}` + JSON.stringify(nestedval)
      );
      return nestedval;
    }

    const objectIdPrefix = 'ObjectId(';
    const objectIdSuffix = ')';
    const objectIdPrefixLen = objectIdPrefix.length;
    if (
      typeof value === 'string' &&
      value.startsWith(objectIdPrefix) &&
      value.endsWith(objectIdSuffix)
    ) {
      const valueKey: string = value.slice(objectIdPrefixLen, value.length - 1);
      return new ObjectId(valueKey);
    }
    return value;
  }
}
