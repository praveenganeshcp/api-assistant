import { Collection, Db, Filter, FindOptions, OptionalId, OptionalUnlessRequiredId } from "mongodb";
import { DB_COLLECTIONS } from "./db-collections";
import { Inject } from "@nestjs/common";
import { MONGO_DB_CONNECTION } from "./repository.module";
import { CanBeNull } from "../../utils/types";
import { Document as MongoDocument } from "mongodb";

export class AbstractRepository<T extends MongoDocument> {

    @Inject(MONGO_DB_CONNECTION)
    private dbConnection!: Db;

    private collection!: Collection<T>;

    constructor(private readonly collectionName: DB_COLLECTIONS) {
        setTimeout(() => {
            this.collection = this.dbConnection.collection(collectionName);
        }, 0)
    }

    public async findOne(
        query: Filter<T>, 
        findOneOptions: FindOptions = {}
    ): Promise<CanBeNull<T>> {
        const findOneResult: unknown = 
            this.collection.findOne(query, findOneOptions)
        return findOneResult as CanBeNull<T>;
    }

    public async save(data: OptionalId<T>): Promise<T> {
        const saveResult = 
            await this.collection.insertOne(data as OptionalUnlessRequiredId<T>);
        const savedData: unknown =
            await this.collection.findOne({_id: saveResult.insertedId} as Filter<T>)
        return savedData as T;
    }

}