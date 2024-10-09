import {
  PlaceholderDataSource,
  RequestDataAsyncValidation,
  RequestDataValidation,
} from '@api-assistant/applications-crud-engine-core';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Db } from 'mongodb';
import { CRUDActionExecutorUsecase } from './crud-action-executor.usecase';
import { ValueAssertorService } from './value-assertor.service';

interface RequestDataAsyncValidatorInput {
  db: Db;
  requestData: PlaceholderDataSource;
  validations: RequestDataValidation;
}

@Injectable()
export class RequestDataAsyncValidatorService {
  private readonly logger = new Logger(RequestDataAsyncValidatorService.name);

  private readonly valueAssetor = new ValueAssertorService();

  constructor(private readonly crudActionExecutor: CRUDActionExecutorUsecase) {}

  async validateAsync(data: RequestDataAsyncValidatorInput) {
    const { validations, requestData, db } = data;
    if (validations.body) {
      this.logger.log(
        'validating async request body',
        data.requestData,
        validations.body
      );
      for (let key of Object.keys(requestData.requestBody)) {
        if (validations.body?.[key]) {
          this.logger.log(
            `validating async key: ${key} with value`,
            requestData.requestBody[key]
          );
          await this.runDbQueries(db, validations.body[key]?.async);
        }
      }
    }
  }

  private async runDbQueries(
    db: Db,
    validations: RequestDataAsyncValidation[] = []
  ) {
    for (const validation of validations) {
      this.logger.log('running async validation', validation);
      const result = await this.crudActionExecutor.execute({
        db,
        actionDef: {
          collectionName: validation.collectionName,
          payload: {
            filter: validation.query,
            options: {},
          },
          operation: validation.operation,
        },
      });
      this.logger.log('async validation result', result);
      if (
        !this.valueAssetor.assert(
          result,
          validation.expectedValue,
          validation.operator
        )
      ) {
        throw new HttpException(validation.message, 400);
      }
    }
  }
}
