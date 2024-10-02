import { BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';

export class CoreEngineUnSupportedVariableTypeException extends BadRequestException {
    constructor(variableType: string) {
      super(`${variableType} currently not supported`);
    }
  }

export class CoreEngineUnSupportedActionException extends BadRequestException {
  constructor(actionName: string) {
    super(`${actionName} currently not supported`);
  }
}

export class CoreEngineFindActionPayloadMissingException extends BadRequestException {
  constructor() {
    super('filter or options object is missing in the payload object');
  }
}

export class CoreEngineUpdateActionPayloadMissingException extends BadRequestException {
  constructor() {
    super('filter or patch object is missing in the payload object');
  }
}

export class CoreEngineInvalidVariablePathException extends BadRequestException {
  constructor(variableName: string) {
    super(`${variableName} does not resolve to the value`);
  }
}

export class CoreEngineInsertManyActionInvalidDataException extends BadRequestException {
  constructor() {
    super('InsertMany actiom should array type payload');
  }
}

export class CoreEngineProcessingException extends BadRequestException {
  constructor() {
    super('Error in processing the action. Please check the payload');
  }
}

export class InvalidFilePathException extends BadRequestException {
  constructor() {
    super('File path does not exist in your folder');
  }
}

export class InvalidLoginException extends ForbiddenException {
  constructor() {
    super('Invalid emailId or password');
  }
}

export class SessionExpiredException extends UnauthorizedException {
  constructor() {
    super('Session expired')
  }
}