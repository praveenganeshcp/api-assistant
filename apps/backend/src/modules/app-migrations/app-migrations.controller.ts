import {
  ApplyMigrationUsecase,
  CreateMigrationUsecase,
  RevertMigrationUsecase,
  UpdateMigrationLogicUsecase,
} from "@api-assistant/application-db-migrations-be";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ObjectId } from "mongodb";
import { UpdateMigrationLogicDTO } from "./app-migrations.dto";

@Controller("applications/:applicationId/migrations")
export class ApplicationMigrationsController {
  constructor(
    private readonly updateMigrationLogicUsecase: UpdateMigrationLogicUsecase,
    private readonly applyMigrationUsecase: ApplyMigrationUsecase,
    private readonly revertMigrationUsecase: RevertMigrationUsecase,
    private readonly createMigrationUsecase: CreateMigrationUsecase
  ) {}

  @Get()
  fetchAllMigrations(@Param("applicationId") applicationId: string) {}

  @Get(":fileName")
  fetchMigrationLogic(
    @Param("applicationId") applicationId: string,
    @Param("fileName") fileName: string
  ) {}

  @Patch()
  updateMigrationLogic(
    @Param("applicationId") applicationId: string,
    @Body() payload: UpdateMigrationLogicDTO
  ) {
    return this.updateMigrationLogicUsecase.execute({
      applicationId: new ObjectId(applicationId),
      logic: payload.logic,
      fileName: payload.fileName,
    });
  }

  @Patch("apply")
  applyMigration(@Param("applicationId") applicationId: string) {
    return this.applyMigrationUsecase.execute({
      applicationId: new ObjectId(applicationId),
    });
  }

  @Delete("revert")
  revertMigration(@Param("applicationId") applicationId: string) {
    return this.revertMigrationUsecase.execute({
      applicationId: new ObjectId(applicationId),
    });
  }

  @Post()
  createMigration(
    @Body("fileName") fileName: string,
    @Param("applicationId") applicationId: string
  ) {
    return this.createMigrationUsecase.execute({
      applicationId: new ObjectId(applicationId),
      fileName,
    });
  }
}
