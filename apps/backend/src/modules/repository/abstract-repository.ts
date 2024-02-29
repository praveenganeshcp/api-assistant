import {
  Collection,
  Db,
  Filter,
  FindOptions,
  OptionalId,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from 'mongodb';
import { DB_COLLECTIONS } from './db-collections';
import { Inject, Logger } from '@nestjs/common';
import { MONGO_DB_CONNECTION } from './repository.module';
import { CanBeNull } from '@api-assistant/commons';
import { Document as MongoDocument } from 'mongodb';

export class AbstractRepository<T extends MongoDocument> {
  @Inject(MONGO_DB_CONNECTION)
  private dbConnection!: Db;

  private logger = new Logger(AbstractRepository.name);

  private collection!: Collection<T>;

  constructor(private readonly collectionName: DB_COLLECTIONS) {
    setTimeout(() => {
      this.collection = this.dbConnection.collection(collectionName);
    }, 0);
  }

  public async findOne(
    query: Filter<T>,
    findOneOptions: FindOptions = {}
  ): Promise<CanBeNull<T>> {
    this.logger.log(
      `Performing findOne in ${this.collectionName} with query and options`
    );
    const findOneResult: unknown = this.collection.findOne(
      query,
      findOneOptions
    );
    this.logger.log(`Computed findOne result`);
    return findOneResult as CanBeNull<T>;
  }

  public async aggregate<T>(steps: unknown): Promise<T> {
    this.logger.log(`Performing aggregate in ${this.collectionName}`);
    const aggregateResult: unknown = await this.collection
      .aggregate(steps as MongoDocument[])
      .toArray();
    this.logger.log(`Computed findOne result`);
    return aggregateResult as T;
  }

  public async save(data: OptionalId<T>): Promise<T> {
    this.logger.log(`Creating new record in ${this.collectionName}`);
    const saveResult = await this.collection.insertOne(
      data as OptionalUnlessRequiredId<T>
    );
    this.logger.log(`New record created in ${this.collectionName}`);
    const savedData: unknown = await this.collection.findOne({
      _id: saveResult.insertedId,
    } as Filter<T>);
    return savedData as T;
  }

  public async updateOne(
    filter: Filter<T>,
    updateFilter: UpdateFilter<T> | Partial<T>
  ) {
    this.logger.log(`updating record in ${this.collectionName}`);
    return this.collection.updateOne(filter, updateFilter);
  }
}
