import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { CRUD_DB_CONNECTION } from '../utils/utils';

@Injectable()
export class CoreEngineFetchCollectionsUsecase
  implements Usecase<string, string[]>
{
  private logger = new Logger(CoreEngineFetchCollectionsUsecase.name);

  constructor(
    @Inject(CRUD_DB_CONNECTION)
    private readonly connection: MongoClient
  ) {}

  async execute(applicationId: string): Promise<string[]> {
    const db = this.connection.db(`api-crud-${applicationId.toString()}`)

    const collectionNames: string[] = await (
      await db.listCollections().toArray()
    ).map((collection) => collection.name);
    this.logger.log(
      'Fetched all collections for applicationid ' + applicationId
    );
    return collectionNames;
  }
}
