import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { crudDbConnectionFactory } from '../utils';
import { dbConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class CoreEngineFetchCollectionsUsecase
  implements Usecase<string, string[]>
{
  private logger = new Logger(CoreEngineFetchCollectionsUsecase.name);

  constructor(
    @Inject(dbConfig.KEY) private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(projectId: string): Promise<string[]> {
    const { db, connection } = await crudDbConnectionFactory(projectId, this.databaseConfig.DB_URL);

    const collectionNames: string[] = await (
      await db.listCollections().toArray()
    ).map((collection) => collection.name);
    this.logger.log('Fetched all collections for projectid ' + projectId);
    connection.close();
    this.logger.log('Closed connection to crud db');
    return collectionNames;
  }
}
