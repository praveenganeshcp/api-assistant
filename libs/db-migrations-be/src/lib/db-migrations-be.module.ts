import { CrudEngineBeModule } from '@api-assistant/crud-engine-be';
import { Module } from '@nestjs/common';
import { FetchApplicationMigrationsUsecase } from './usecases/fetch-application-migrations.usecase';
import { UpdateMigrationLogicUsecase } from './usecases/update-migration-logic.usecase';
import { ApplyMigrationUsecase } from './usecases/apply-migration.usecase';
import { RevertMigrationUsecase } from './usecases/revert-migration.usecase';
import { CreateMigrationUsecase } from './usecases/create-migration.usecase';
import { FetchMigrationByFileNameUsecase } from './usecases/fetch-migration-by-filename.usecase';

@Module({
  providers: [
    FetchApplicationMigrationsUsecase,
    UpdateMigrationLogicUsecase,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    CreateMigrationUsecase,
    FetchMigrationByFileNameUsecase,
  ],
  exports: [
    FetchApplicationMigrationsUsecase,
    UpdateMigrationLogicUsecase,
    ApplyMigrationUsecase,
    RevertMigrationUsecase,
    CreateMigrationUsecase,
    FetchMigrationByFileNameUsecase,
  ],
  imports: [CrudEngineBeModule],
})
export class DbMigrationsBeModule {}
