import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsObject,
  IsString,
  IsStrongPassword,
  Max,
  ValidateNested,
} from 'class-validator';
import { Filter, FindOptions, UpdateFilter } from 'mongodb';

export enum ALLOWED_DB_OPERATIONS {
  findOne = 'findOne',
  find = 'find',
  insertOne = 'insertOne',
  insertMany = 'insertMany',
  updateOne = 'updateOne',
  updateMany = 'updateMany',
}

export interface CreatePayload {
  [key: string]: unknown;
}

export interface ReadPayload {
  filter: Filter<unknown>;
  options: FindOptions;
}

export interface UpdatePayload {
  filter: Filter<unknown>;
  patch: UpdateFilter<unknown>;
}

export interface DeletePayload {
  filter: Filter<unknown>;
}

export type CoreEngineCRUDPayload =
  | CreatePayload
  | CreatePayload[]
  | ReadPayload
  | UpdatePayload
  | DeletePayload;

export type CoreEngineCRUDResponse = unknown;

export class CoreEngineCRUDOperation {
  @IsEnum(ALLOWED_DB_OPERATIONS)
  action!: ALLOWED_DB_OPERATIONS;

  @IsString()
  collectionName!: string;

  payload!: CoreEngineCRUDPayload;
}

export class CoreEngineCRUDDto {
  @Type(() => CoreEngineCRUDOperation)
  @ValidateNested({ each: true })
  crud!: CoreEngineCRUDOperation[];

  @IsObject()
  response!: CoreEngineCRUDResponse;
}

export class CoreEngineCreateAccountDTO {
  @IsString({})
  username!: string;

  @IsStrongPassword()
  password!: string;

  @IsEmail()
  emailId!: string;
}

export class CoreEngineLoginAccountDTO {
  @IsStrongPassword()
  password!: string;

  @IsEmail()
  emailId!: string;
}
