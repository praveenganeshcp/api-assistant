import {
  PlaceholderDataSource,
  RequestDataSyncValidation,
  RequestDataValidation,
} from '@api-assistant/crud-engine-core';
import { HttpException, Injectable, Logger } from '@nestjs/common';

interface RequestDataValidatorInput {
  validations: RequestDataValidation;
  requestData: PlaceholderDataSource;
}

@Injectable()
export class RequestDataValidatorService {
  private readonly logger = new Logger(RequestDataValidatorService.name);

  validate(data: RequestDataValidatorInput): void {
    const { validations, requestData } = data;
    if (validations.body) {
      this.logger.log(
        'validating request body',
        data.requestData,
        validations.body
      );
      for (let key of Object.keys(requestData.requestBody)) {
        if (requestData.requestBody?.[key]) {
          this.logger.log(
            `validating key: ${key} with value`,
            requestData.requestBody[key]
          );
          this.validateData(
            key,
            requestData.requestBody[key],
            validations.body[key]?.sync
          );
        }
      }
    }
    return;
  }

  private validateData(
    key: string,
    value: unknown,
    fieldValidations: RequestDataSyncValidation[] = []
  ) {
    for (let validation of fieldValidations) {
      try {
        switch (validation.name) {
          case 'string-type': {
            this.validateStringType(key, value);
            return;
          }
          case 'numeric-type': {
            this.validateNumericType(key, value);
            return;
          }
          case 'boolean-type': {
            this.validateBooleanType(key, value);
            return;
          }
        }
      } catch (err) {
        if (err instanceof HttpException) {
          throw new HttpException(validation.message, 400);
        }
        throw err;
      }
    }
  }

  private validateBooleanType(key: string, value: unknown) {
    if (typeof value !== 'boolean') {
      throw new HttpException(
        `${key} must be boolean type. Received ${value}`,
        400
      );
    }
  }

  private validateStringType(key: string, value: unknown) {
    if (typeof value !== 'string') {
      throw new HttpException(
        `${key} must be string type. Received ${value}`,
        400
      );
    }
  }

  private validateNumericType(key: string, value: unknown) {
    if (typeof value !== 'number') {
      throw new HttpException(
        `${key} must be number type. Received ${value}`,
        400
      );
    }
  }
}
