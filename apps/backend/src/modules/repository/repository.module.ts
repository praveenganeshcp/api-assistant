import { Global, Module } from "@nestjs/common";
import { createDbConnection } from "./db-connection";

export const MONGO_DB_CONNECTION = "MONGO_DB_CONNECTION"

@Global()
@Module({
    providers: [
        {
            provide: MONGO_DB_CONNECTION,
            useFactory: createDbConnection,
        },
    ],
    exports: [
        MONGO_DB_CONNECTION
    ]
})
export class RepositoryModule {}