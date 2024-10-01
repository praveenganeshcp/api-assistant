import {
  ALLOWED_DB_OPERATIONS,
  CRUDActionDefinition,
  CRUDActionResponse,
  CRUDEngineHttpMethods,
  RequestDataValidation,
} from '@api-assistant/crud-engine-core';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class EndpointActionDefinitionDto {
  @IsEnum(ALLOWED_DB_OPERATIONS)
  operation!: ALLOWED_DB_OPERATIONS;

  @IsString()
  collectionName!: string;

  payload!: CRUDActionDefinition;
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
  method!: CRUDEngineHttpMethods
}

export class PatchEndpointCRUDDto extends CreateEndpointCRUDDto {}
