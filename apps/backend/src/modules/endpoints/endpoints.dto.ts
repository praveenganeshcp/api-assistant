import {
  ALLOWED_DB_OPERATIONS_IN_ENDPOINT,
  EndpointActionQuery,
  EndpointResponse,
} from '@api-assistant/endpoints-be';
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
  @IsEnum(ALLOWED_DB_OPERATIONS_IN_ENDPOINT)
  action!: ALLOWED_DB_OPERATIONS_IN_ENDPOINT;

  @IsString()
  collectionName!: string;

  payload!: EndpointActionQuery;
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
  response!: EndpointResponse;
}

export class PatchEndpointCRUDDto extends CreateEndpointCRUDDto {}
