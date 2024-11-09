import {
  ALLOWED_DB_OPERATIONS,
  CRUDActionPayload,
} from "@api-assistant/application-endpoints-core";
import { IsEnum, IsString } from "class-validator";

export class ApplicationDatabaseOperation {
  @IsEnum(ALLOWED_DB_OPERATIONS)
  operation!: ALLOWED_DB_OPERATIONS;

  @IsString()
  collectionName!: string;

  payload!: CRUDActionPayload;
}
