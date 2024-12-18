import {
  ALLOWED_DB_OPERATIONS,
  CRUDActionPayload,
  CRUDActionResponse,
  CRUDEngineHttpMethods,
  RequestDataValidation,
} from "@api-assistant/application-endpoints-core";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

export class EndpointActionDefinitionDto {
  @IsEnum(ALLOWED_DB_OPERATIONS)
  operation!: ALLOWED_DB_OPERATIONS;

  @IsString()
  collectionName!: string;

  payload!: CRUDActionPayload;
}

export class CreateEndpointCRUDDto {
  @IsString()
  @Length(3, 20)
  name!: string;

  @IsString()
  @Length(5, 100)
  description!: string;

  @IsString()
  url!: string;

  @Type(() => EndpointActionDefinitionDto)
  @ValidateNested({ each: true })
  @IsArray()
  crud!: EndpointActionDefinitionDto[];

  @IsObject()
  validations!: RequestDataValidation;

  @IsObject()
  response!: CRUDActionResponse;

  @IsString()
  method!: CRUDEngineHttpMethods;

  @IsBoolean()
  isAuthenticated!: boolean;

  @IsString()
  requestHandler!: string;

  @IsBoolean()
  useCloudCode!: boolean;
}

export class PatchEndpointCRUDDto extends CreateEndpointCRUDDto {}
