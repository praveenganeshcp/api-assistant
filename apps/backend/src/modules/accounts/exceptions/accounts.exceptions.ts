import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export class AccountNotVerifiedException extends ForbiddenException {
  constructor() {
    super('User Account is not verified');
  }
}

export class IncorrectOldPasswordException extends ForbiddenException {
  constructor() {
    super('Old Password does not match');
  }
}

export class InvalidAuthTokenException extends UnauthorizedException {
  constructor() {
    super('Invalid authentication token');
  }
}

export class InvalidEmailIdPasswordException extends UnauthorizedException {
  constructor() {
    super('EmailID or password is incorrect');
  }
}

export class InvalidVerificationKeyException extends UnauthorizedException {
  constructor() {
    super('Invalid key or account already verified');
  }
}

export class EmailIdNotRegisteredException extends UnauthorizedException {
  constructor() {
    super('EmailID not registered in the system');
  }
}

export class InvalidResetPasswordKeyException extends UnauthorizedException {
  constructor() {
    super('Invalid password reset link');
  }
}
