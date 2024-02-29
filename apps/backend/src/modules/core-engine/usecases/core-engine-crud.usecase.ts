import { Injectable, Logger } from '@nestjs/common';
import { Usecase, valueIsDefined } from '@api-assistant/commons';
import { Collection, Db, MongoClient, MongoServerError } from 'mongodb';
import {
  ALLOWED_DB_OPERATIONS,
  CoreEngineCRUDOperation,
  CoreEngineCRUDResponse,
  CreatePayload,
  ReadPayload,
  UpdatePayload,
} from '../core-engine-dto';
import {
  CoreEngineFindActionPayloadMissingException,
  CoreEngineInsertManyActionInvalidDataException,
  CoreEngineInvalidVariablePathException,
  CoreEngineProcessingException,
  CoreEngineUnSupportedActionException,
  CoreEngineUpdateActionPayloadMissingException,
} from '../core-engine.exceptions';
import { crudDbConnectionFactory } from '../utils';

interface CoreEngineCRUDUsecaseInput {
  response: CoreEngineCRUDResponse;
  crud: CoreEngineCRUDOperation[];
  projectId: string;
}

@Injectable()
export class CoreEngineCRUDUsecase
  implements Usecase<CoreEngineCRUDUsecaseInput, CoreEngineCRUDResponse>
{
  private logger = new Logger(CoreEngineCRUDUsecase.name);

  async execute(
    input: CoreEngineCRUDUsecaseInput
  ): Promise<CoreEngineCRUDResponse> {
    try {
      const { crud, response, projectId } = input;

      this.logger.log('Handling core engine CRUD');
      const { connection: mongoConnection, db } = await crudDbConnectionFactory(
        projectId
      );

      const crudResponse: any[] = [];
      for (const operation of crud) {
        crudResponse.push(
          await this.performCRUD(
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
      if (err instanceof MongoServerError)
        throw new CoreEngineProcessingException();
      else throw err;
    }
  }

  private performCRUD(
    operation: CoreEngineCRUDOperation,
    db: Db
  ): Promise<unknown> {
    const collection = db.collection(operation.collectionName);
    this.logger.log(`connected to collection: ${operation.collectionName}`);
    switch (operation.action) {
      case ALLOWED_DB_OPERATIONS.findOne: {
        return this.findOne(collection, operation.payload as ReadPayload);
      }
      case ALLOWED_DB_OPERATIONS.find: {
        return this.find(collection, operation.payload as ReadPayload);
      }
      case ALLOWED_DB_OPERATIONS.insertOne: {
        return this.insertOne(collection, operation.payload as CreatePayload);
      }
      case ALLOWED_DB_OPERATIONS.insertMany: {
        return this.insertMany(
          collection,
          operation.payload as CreatePayload[]
        );
      }
      case ALLOWED_DB_OPERATIONS.updateOne: {
        return this.updateOne(collection, operation.payload as UpdatePayload);
      }
      default: {
        throw new CoreEngineUnSupportedActionException(operation.action);
      }
    }
  }

  private findOne(collection: Collection, payload: ReadPayload) {
    this.logger.log('Performing findOne');
    if (!payload.filter || !payload.options) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.findOne(payload.filter, payload.options);
  }

  private find(collection: Collection, payload: ReadPayload) {
    this.logger.log('Performing find');
    if (!payload.filter || !payload.options) {
      throw new CoreEngineFindActionPayloadMissingException();
    }
    return collection.find(payload.filter, payload.options).toArray();
  }

  private insertOne(collection: Collection, payload: CreatePayload) {
    this.logger.log('Performing insertOne');
    return collection.insertOne(payload);
  }

  private insertMany(collection: Collection, payload: CreatePayload[]) {
    if (!Array.isArray(payload)) {
      throw new CoreEngineInsertManyActionInvalidDataException();
    }
    this.logger.log('Performing insertMany');
    return collection.insertMany(payload);
  }

  private updateOne(collection: Collection, payload: UpdatePayload) {
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
    return value;
  }
}
