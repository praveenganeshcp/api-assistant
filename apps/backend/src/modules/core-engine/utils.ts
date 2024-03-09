import { Logger } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { join } from 'path';

const filesSeperator = '/';

export const CORE_ENGINE_UPLOAD_ROOT = 'core-engine-uploads';

export async function crudDbConnectionFactory(projectId: string): Promise<{
  db: Db;
  connection: MongoClient;
}> {
  const logger = new Logger(crudDbConnectionFactory.name);
  logger.log('Connecting to crud mongodb host...');
  const mongoClient = new MongoClient('mongodb://3.6.87.110:27017');
  const connection = await mongoClient.connect();
  logger.log('Connected to crud mongodb host');

  logger.log(`Creating core engine db connection to id ${projectId}...`);
  const db = connection.db(`api-assistant-crud-${projectId}`);
  logger.log(`Core engine db connected to id ${projectId}`);
  return { db, connection };
}

export function removeRootPath(objectPath: string): string {
  const projectRoot = objectPath.split(CORE_ENGINE_UPLOAD_ROOT)[1];
  const removedPath = join(...projectRoot.split(filesSeperator).slice(2));
  return filesSeperator + removedPath;
}
