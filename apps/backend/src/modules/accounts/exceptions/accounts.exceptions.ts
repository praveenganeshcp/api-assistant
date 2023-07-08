import { ForbiddenException, UnauthorizedException } from "@nestjs/common";

export class AccountNotVerifiedException extends ForbiddenException {
    constructor() {
        super("User Account is not verified");
    }
}

export class InvalidAuthTokenException extends UnauthorizedException {
    constructor() {
        super("Invalid authentication token");
    }
}

export class InvalidEmailIdPasswordException extends UnauthorizedException {
    constructor() {
        super("EmailID and password does not match");
    }
}