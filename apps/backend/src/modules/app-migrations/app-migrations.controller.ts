import {
  ApplyMigrationUsecase,
  CreateMigrationUsecase,
  FetchApplicationMigrationsUsecase,
  FetchMigrationByFileNameUsecase,
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
  Req,
} from "@nestjs/common";
import { ObjectId } from "mongodb";
import { UpdateMigrationLogicDTO } from "./app-migrations.dto";
import { Request } from "express";

@Controller("applications/:applicationId/migrations")
export class ApplicationMigrationsController {
  constructor(
    private readonly updateMigrationLogicUsecase: UpdateMigrationLogicUsecase,
    private readonly applyMigrationUsecase: ApplyMigrationUsecase,
    private readonly revertMigrationUsecase: RevertMigrationUsecase,
    private readonly createMigrationUsecase: CreateMigrationUsecase,
    private readonly fetchMigrationLogicUsecase: FetchMigrationByFileNameUsecase,
    private readonly fetchMigrationsUsecase: FetchApplicationMigrationsUsecase,
  ) {}

  @Get()
  async fetchAllMigrations(
    @Param('applicationId') applicationId: string
  ) {
    return this.fetchMigrationsUsecase.execute({applicationId: new ObjectId(applicationId)})
  }

  @Get(":fileName")
  async fetchMigrationLogic(
    @Param('applicationId') applicationId: string,
    @Req() request: Request,
    @Param("fileName") fileName: string
  ) {
    this.fetchMigrationLogicUsecase.execute({applicationId: new ObjectId(applicationId), fileName })
  }

  @Patch()
  updateMigrationLogic(
    @Param('applicationId') applicationId: string,
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
