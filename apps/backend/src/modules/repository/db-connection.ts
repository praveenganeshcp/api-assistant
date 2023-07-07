import { Logger } from "@nestjs/common";
import { Db, MongoClient } from "mongodb";
import { dbConfig } from "../../config/db.config";
import { ConfigType } from "@nestjs/config";

export async function createDbConnection(
    databaseConfig: ConfigType<typeof dbConfig>
): Promise<Db> {
    const logger = new Logger(createDbConnection.name);
    try {
        logger.log("Connecting to DB...");
        const mongoClient = new MongoClient(databaseConfig.DB_URL);
        const connection = await mongoClient.connect();
        logger.log("connected to DB");
        return connection.db(databaseConfig.DB_NAME);
    }
    catch(err) {
        logger.error("Error in connecting to DB");
        logger.error(err);
        throw err;
    }
}