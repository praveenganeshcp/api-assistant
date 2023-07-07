import { Logger } from "@nestjs/common";
import { Db, MongoClient } from "mongodb";

export async function createDbConnection(): Promise<Db> {
    const logger = new Logger(createDbConnection.name);
    try {
        logger.log("Connecting to DB...");
        const mongoClient = new MongoClient("mongodb://localhost:27017");
        const connection = await mongoClient.connect();
        logger.log("connected to DB");
        return connection.db("api-assistant-v6");
    }
    catch(err) {
        logger.error("Error in connecting to DB");
        logger.error(err);
        throw err;
    }
}