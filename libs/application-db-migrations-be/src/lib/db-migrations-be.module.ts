import { Module } from "@nestjs/common";
import { UpdateMigrationLogicUsecase } from "./usecases/update-migration-logic.usecase";
import { CreateMigrationUsecase } from "./usecases/create-migration.usecase";
import { CRUDAppAPIAdapter } from "@api-assistant/commons-be";
import { ApplyMigrationUsecase } from "./usecases/apply-migration.usecase";
import { RevertMigrationUsecase } from "./usecases/revert-migration.usecase";
import { FetchMigrationByFileNameUsecase } from "./usecases/fetch-migration-by-filename.usecase";
import { FetchApplicationMigrationsUsecase } from "./usecases/fetch-application-migrations.usecase";
import { ApplicationsBeModule } from "@api-assistant/applications-be";

@Module({
  imports: [ApplicationsBeModule],
  providers: [
    UpdateMigrationLogicUsecase,
    CreateMigrationUsecase,
    CRUDAppAPIAdapter,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    FetchMigrationByFileNameUsecase,
    FetchApplicationMigrationsUsecase
  ],
  exports: [
    UpdateMigrationLogicUsecase,
    CreateMigrationUsecase,
    CRUDAppAPIAdapter,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    FetchMigrationByFileNameUsecase,
    FetchApplicationMigrationsUsecase
  ],
})
export class DbMigrationsBeModule {}
