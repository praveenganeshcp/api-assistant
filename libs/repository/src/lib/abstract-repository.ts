import {
  Collection,
  Db,
  Filter,
  FindOneAndUpdateOptions,
  FindOptions,
  OptionalId,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from 'mongodb';
import { Inject, Logger } from '@nestjs/common';
import { CanBeNull } from '@api-assistant/commons-be';
import { Document as MongoDocument } from 'mongodb';
import { MONGO_DB_CONNECTION } from './repository.module';

export class Repository<T extends MongoDocument> {
  @Inject(MONGO_DB_CONNECTION)
  private dbConnection!: Db;

  private logger = new Logger(Repository.name);

  private collection!: Collection<T>;

  constructor(private readonly collectionName: string) {
    setTimeout(() => {
      this.collection = this.dbConnection.collection(collectionName);
    }, 0);
  }

  public async findOneAndUpdate(
    filter: Filter<T>,
    update: UpdateFilter<T>,
    options: FindOneAndUpdateOptions
  ) {
    return this.collection.findOneAndUpdate(
      filter,
      update,
      options
    )
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

  public async findAll(
    query: Filter<T>,
    findAllOptions: FindOptions = {}
  ): Promise<T[]> {
    this.logger.log(
      `Performing findAll in ${this.collectionName} with query and options`
    );
    const findAllResult: T[] = (await this.collection
      .find(query, findAllOptions)
      .toArray()) as T[];
    this.logger.log(`Computed findAll result`);
    return findAllResult;
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

  public async deleteOne(filter: Filter<T>) {
    this.logger.log(`deleting record in ${this.collectionName}`);
    return this.collection.deleteOne(filter);
  }

  public async deleteAll(filter: Filter<T>) {
    this.logger.log(`deleting multiple record in ${this.collectionName}`);
    return this.collection.deleteMany(filter);
  }
}
