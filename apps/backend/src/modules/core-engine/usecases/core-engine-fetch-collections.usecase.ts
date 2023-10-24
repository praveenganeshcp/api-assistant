import { Usecase } from '@api-assistant/utils';
import { Injectable, Logger } from '@nestjs/common';
import { crudDbConnectionFactory } from '../utils';

@Injectable()
export class CoreEngineFetchCollectionsUsecase
  implements Usecase<string, string[]>
{
  private logger = new Logger(CoreEngineFetchCollectionsUsecase.name);

  async execute(projectId: string): Promise<string[]> {
    const { db, connection } = await crudDbConnectionFactory(projectId);

    const collectionNames: string[] = await (
      await db.listCollections().toArray()
    ).map((collection) => collection.name);
    this.logger.log('Fetched all collections for projectid ' + projectId);
    connection.close();
    this.logger.log('Closed connection to crud db');
    return collectionNames;
  }
}
