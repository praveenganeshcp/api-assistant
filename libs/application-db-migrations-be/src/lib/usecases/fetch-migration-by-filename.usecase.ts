import { CRUDAppAPIAdapter, Usecase } from "@api-assistant/commons-be";
import { readFile } from "fs/promises";
import {
  ApplicationMigration,
} from "@api-assistant/application-migrations-core";
import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";
import { FetchApplicationByIdUsecase } from "@api-assistant/applications-be";
import { ObjectId } from "mongodb";

interface FetchMigrationByFileNameUsecaseInput {
  fileName: string;
  applicationId: ObjectId
}

interface FetchMigrationByFileNameUsecaseOutput extends ApplicationMigration {
  logic: string;
}

@Injectable()
export class FetchMigrationByFileNameUsecase
  implements
    Usecase<
      FetchMigrationByFileNameUsecaseInput,
      FetchMigrationByFileNameUsecaseOutput
    >
{
  private readonly logger = new Logger(FetchMigrationByFileNameUsecase.name);

  constructor(
    @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    private readonly apiAdapter: CRUDAppAPIAdapter,
    private readonly fetchApplicationByIdUsecase: FetchApplicationByIdUsecase,
  ) {}

  async execute(
    data: FetchMigrationByFileNameUsecaseInput
  ): Promise<FetchMigrationByFileNameUsecaseOutput> {
    const application = await this.fetchApplicationByIdUsecase.execute(data.applicationId);
    if(!application) {
      throw new BadRequestException('invalid app id');
    }
    this.logger.log("fetching migration for file name " + data.fileName);
    const appliedMigrationFromDb = ((await this.apiAdapter.get(application.port, '/api/v6/database/migrations')).migrations as unknown as ApplicationMigration[]).find(migration => migration.fileName === data.fileName);
    this.logger.log("found migration from db", appliedMigrationFromDb);
    const logic = await readFile(
        `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}/src/migration-files/${data.fileName}`,
      "utf-8"
    );
    return {
      logic,
      fileName: data.fileName,
      status: appliedMigrationFromDb ? "APPLIED" : "PENDING",
      appliedAt: appliedMigrationFromDb
        ? appliedMigrationFromDb.appliedAt
        : null,
    };
  }
}
