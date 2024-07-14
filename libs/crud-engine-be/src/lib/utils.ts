import { Logger } from '@nestjs/common';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { join } from 'path';
import {
  CRUDSupportedVariablesInfo,
  CRUDSupportedVariablesTypes,
  CRUDSystemVariables,
} from './types';
import { valueIsDefined } from '@api-assistant/commons-be';
import { CoreEngineInvalidVariablePathException } from './core-engine.exceptions';

const filesSeperator = '/';

export const CORE_ENGINE_UPLOAD_ROOT = 'core-engine-uploads';

export async function crudDbConnectionFactory(
  projectId: string,
  url: string
): Promise<{
  db: Db;
  connection: MongoClient;
}> {
  const logger = new Logger(crudDbConnectionFactory.name);
  logger.log('Connecting to crud mongodb host...');
  const mongoClient = new MongoClient(url);
  const connection = await mongoClient.connect();
  logger.log('Connected to crud mongodb host');

  logger.log(`Creating core engine db connection to id ${projectId}...`);
  const db = connection.db(`api-crud-${projectId}`);
  logger.log(`Core engine db connected to id ${projectId}`);
  return { db, connection };
}

export function removeRootPath(objectPath: string): string {
  const projectRoot = objectPath.split(CORE_ENGINE_UPLOAD_ROOT)[1];
  const removedPath = join(...projectRoot.split(filesSeperator).slice(2));
  return filesSeperator + removedPath;
}

export function resolveRequestVariable(
  value: string,
  reqBody: Record<string, any>,
  logger: Logger
) {
  const variableBodyPrefixLen =
    CRUDSupportedVariablesInfo.Request.prefix.length;
  logger.log('processing request variable ' + value);
  const valueKey: string = value.slice(variableBodyPrefixLen, value.length - 1);
  const valuePathSeperatedByPeriods = valueKey.split('.').slice(1);
  logger.log(
    'found body variable path ' + JSON.stringify(valuePathSeperatedByPeriods)
  );
  let valueObject = { ...reqBody };
  for (const key of valuePathSeperatedByPeriods) {
    if (!valueIsDefined(valueObject[key])) {
      throw new CoreEngineInvalidVariablePathException(value);
    }
    logger.log(
      `traversing with request body value for key ${key} ` +
        JSON.stringify(valueObject[key])
    );
    valueObject = valueObject[key];
  }
  logger.log(
    `Found body value or variable ${value}` + JSON.stringify(valueObject)
  );
  return valueObject;
}

export function resolveSystemVariable(value: string, logger: Logger) {
  logger.log('processing system variable ' + value);
  const systemVariablePrefixLen =
    CRUDSupportedVariablesInfo.System.prefix.length;
  const systemVariableName: string = value.slice(
    systemVariablePrefixLen,
    value.length - 1
  );
  if (systemVariableName === CRUDSystemVariables.UTCDateTime) {
    return new Date();
  } else {
    throw new Error(
      `${systemVariableName} is not supported as system variable`
    );
  }
}

export function resolveObjectVariable(value: string, logger: Logger) {
  logger.log('processing objectId variable ' + value);
  const objectIdPrefixLen = CRUDSupportedVariablesInfo.ObjectId.prefix.length;
  const valueKey: string = value.slice(objectIdPrefixLen, value.length - 1);
  return new ObjectId(valueKey);
}

export function resolveStepVariable(
  value: string,
  logger: Logger,
  stepsInput: Array<any>
) {
  const stepVariablePrefixLen = CRUDSupportedVariablesInfo.Steps.prefix.length;
  logger.log('processing step variable ' + value);
  const valueKey: string = value.slice(stepVariablePrefixLen, value.length - 1);
  const valuePathSeperatedByPeriods = valueKey.split('.').slice(1);
  logger.log(
    'found step variable paths' + JSON.stringify(valuePathSeperatedByPeriods)
  );
  let stepsInputObject = stepsInput;
  for (const key of valuePathSeperatedByPeriods) {
    if (!valueIsDefined(stepsInputObject[key as unknown as number])) {
      throw new CoreEngineInvalidVariablePathException(value);
    }
    logger.log(
      `traversing step value for key ${key}` +
        JSON.stringify(stepsInputObject[key as unknown as number])
    );
    stepsInputObject = stepsInputObject[key as unknown as number];
  }
  logger.log(
    `Found step value for variable ${value}` + JSON.stringify(stepsInputObject)
  );
  return stepsInputObject;
}

export function isRequestVariable(value: string) {
  return (
    value.startsWith(CRUDSupportedVariablesInfo.Request.prefix) &&
    value.endsWith(CRUDSupportedVariablesInfo.Request.suffix)
  );
}

export function isSystemVariable(value: string) {
  return (
    value.startsWith(CRUDSupportedVariablesInfo.System.prefix) &&
    value.endsWith(CRUDSupportedVariablesInfo.System.suffix)
  );
}

export function isObjectIdVariable(value: string) {
  return (
    value.startsWith(CRUDSupportedVariablesInfo.ObjectId.prefix) &&
    value.endsWith(CRUDSupportedVariablesInfo.ObjectId.suffix)
  );
}

export function isStepVariable(value: string) {
  return (
    value.startsWith(CRUDSupportedVariablesInfo.Steps.prefix) &&
    value.endsWith(CRUDSupportedVariablesInfo.Steps.suffix)
  );
}

export function resolveVariableType(
  value: string,
  logger: Logger
): CRUDSupportedVariablesTypes | undefined {
  logger.log('resolving variable type ' + value);
  if (isRequestVariable(value)) {
    return 'Request';
  } else if (isSystemVariable(value)) {
    return 'System';
  } else if (isObjectIdVariable(value)) {
    return 'ObjectId';
  } else if (isStepVariable(value)) {
    return 'Steps';
  }
  return undefined;
}
