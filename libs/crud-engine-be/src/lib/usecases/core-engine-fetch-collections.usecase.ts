import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { CRUD_DB_CONNECTION } from '../utils/utils';

@Injectable()
export class CoreEngineFetchCollectionsUsecase
  implements Usecase<ObjectId, string[]>
{
  private logger = new Logger(CoreEngineFetchCollectionsUsecase.name);

  constructor(
    @Inject(CRUD_DB_CONNECTION)
    private readonly connection: MongoClient
  ) {}

  async execute(applicationId: ObjectId): Promise<string[]> {
    this.logger.log('connecting to app db ' + applicationId.toString());
    const db = this.connection.db(`api-crud-${applicationId.toString()}`);
    this.logger.log('connected to db');
    this.logger.log('fetching collections in db');
    const collectionNames: string[] = await (
      await db.listCollections().toArray()
    ).map((collection) => collection.name);
    this.logger.log(
      'Fetched all collections for applicationid ',
      collectionNames
    );
    return collectionNames;
  }
}
