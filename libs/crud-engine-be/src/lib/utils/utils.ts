import { dbConfig } from '@api-assistant/configuration-be';
import { Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';
import { join } from 'path';

const filesSeperator = '/';

export const CORE_ENGINE_UPLOAD_ROOT = 'core-engine-uploads';

export const CRUD_DB_CONNECTION = 'CRUD_DB_CONNECTION';

export async function crudDbConnectionFactory(
  config: ConfigType<typeof dbConfig>
): Promise<MongoClient> {
  const logger = new Logger(crudDbConnectionFactory.name);
  logger.log('Connecting to crud mongodb host...');
  const mongoClient = new MongoClient(config.DB_URL);
  const connection = await mongoClient.connect();
  logger.log('Connected to crud mongodb host');
  return connection;
}

export function removeRootPath(objectPath: string): string {
  const applicationRoot = objectPath.split(CORE_ENGINE_UPLOAD_ROOT)[1];
  const removedPath = join(...applicationRoot.split(filesSeperator).slice(2));
  return filesSeperator + removedPath;
}




