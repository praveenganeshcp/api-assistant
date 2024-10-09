import {
  PlaceholderDataSource,
  RequestDataValidation,
} from '@api-assistant/applications-crud-engine-core';
import { Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { RequestDataValidatorService } from './request-data-validator.service';
import { RequestDataAsyncValidatorService } from './request-data-async-validator.service';

interface RequestDataValidatorFacadeInput {
  db: Db;
  requestData: PlaceholderDataSource;
  validations: RequestDataValidation;
}

@Injectable()
export class RequestDataValidatorFacadeService {
  constructor(
    private readonly requestDataValidatorService: RequestDataValidatorService,
    private readonly requestDataAsyncValidatorService: RequestDataAsyncValidatorService
  ) {}

  async validate(input: RequestDataValidatorFacadeInput) {
    this.requestDataValidatorService.validate({
      requestData: input.requestData,
      validations: input.validations,
    });

    await this.requestDataAsyncValidatorService.validateAsync({
      db: input.db,
      requestData: input.requestData,
      validations: input.validations,
    });
  }
}
