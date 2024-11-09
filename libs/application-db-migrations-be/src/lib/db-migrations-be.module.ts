import { Module } from "@nestjs/common";
import { UpdateMigrationLogicUsecase } from "./usecases/update-migration-logic.usecase";
import { ApplyMigrationUsecase } from "./usecases/apply-migration.usecase";
import { RevertMigrationUsecase } from "./usecases/revert-migration.usecase";
import { CreateMigrationUsecase } from "./usecases/create-migration.usecase";

@Module({
  providers: [
    UpdateMigrationLogicUsecase,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    CreateMigrationUsecase,
  ],
  exports: [
    UpdateMigrationLogicUsecase,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    CreateMigrationUsecase,
  ],
})
export class DbMigrationsBeModule {}
