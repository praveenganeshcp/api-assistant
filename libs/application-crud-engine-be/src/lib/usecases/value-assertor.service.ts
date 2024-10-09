import { CRUDValidationOperators } from '@api-assistant/applications-crud-engine-core';
import { Logger } from '@nestjs/common';

export class ValueAssertorService {
  private readonly logger = new Logger(ValueAssertorService.name);

  assert(
    value: unknown,
    expectedValue: unknown,
    operator: CRUDValidationOperators
  ): boolean {
    this.logger.log(`asserting values`, value, expectedValue, operator);
    let result = false;
    if (operator === 'eq') {
      result = value === expectedValue;
    } else if (operator === 'ne') {
      result = value !== expectedValue;
    }
    this.logger.log('assertions result is ', result);
    return result;
  }
}
