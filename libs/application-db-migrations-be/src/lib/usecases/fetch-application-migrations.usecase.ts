import { CRUDAppAPIAdapter, Usecase } from "@api-assistant/commons-be";
import {
  ApplicationMigration,
} from "@api-assistant/application-migrations-core";
import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { readdir } from "fs/promises";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";
import { FetchApplicationByIdUsecase } from "@api-assistant/applications-be";

interface FetchApplicationMigrationsUsecaseInput {
  applicationId: ObjectId
}

@Injectable()
export class FetchApplicationMigrationsUsecase
  implements
    Usecase<FetchApplicationMigrationsUsecaseInput, ApplicationMigration[]>
{
  private readonly logger = new Logger(FetchApplicationMigrationsUsecase.name);

  constructor(
    @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    private readonly apiAdapter: CRUDAppAPIAdapter,
    private readonly fetchApplicationByIdUsecase: FetchApplicationByIdUsecase,
  ) {}

  async execute(
    data: FetchApplicationMigrationsUsecaseInput
  ): Promise<ApplicationMigration[]> {
    const application = await this.fetchApplicationByIdUsecase.execute(data.applicationId);
    if(!application) {
      throw new BadRequestException('invalid app id');
    }
    this.logger.log("fetching migrations");
    const allMigrationsFileNames: string[] = await readdir(
      `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}/src/migration-files`
    );
    const appliedMigrationsFromDb: any[] = (await this.apiAdapter.get(application.port, '/api/v6/database/migrations')).migrations;
    this.logger.log("migration data", allMigrationsFileNames, appliedMigrationsFromDb);
    const migrationsResponse: ApplicationMigration[] =
      allMigrationsFileNames.map((migrationFileName) => {
        const appliedMigration = appliedMigrationsFromDb.find(
          (migration) => migration.fileName === migrationFileName
        );
        const migration: ApplicationMigration = {
          fileName: migrationFileName,
          status: appliedMigration ? "APPLIED" : "PENDING",
          appliedAt: appliedMigration ? appliedMigration.appliedAt : null,
        };
        return migration;
      });
    return migrationsResponse;
  }
}
