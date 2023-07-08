import { Injectable, NestMiddleware } from "@nestjs/common";
import { valueIsDefined, valueIsNotEmptyString } from "apps/backend/src/utils/types";
import { Request, Response } from "express";
import { JWTService } from "../services/jwt.service";
import { AccountsService } from "../services/accounts.service";
import { UserDetails } from "../entities/user.entity";
import { AccountNotVerifiedException, InvalidAuthTokenException } from "../exceptions/accounts.exceptions";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JWTService,
        private accountsService: AccountsService
    ) {}

    async use(req: Request, res: Response, next: (error?: any) => void) {
        const jwt: string = req.cookies.token || "";
        req['authUser'] = await this.fetchUserDetails(jwt);
        next();
    }

    private async fetchUserDetails(jwt: string): Promise<UserDetails> {
        if(!valueIsNotEmptyString(jwt)) {
            throw new InvalidAuthTokenException();
        }
        const jwtPayload = this.jwtService.verifyToken(jwt);
        if(!valueIsDefined(jwtPayload)) {
            throw new InvalidAuthTokenException();
        }
        const user = await this.accountsService.findUserById(jwtPayload.sub as string);
        if(!valueIsDefined(user)) {
            throw new InvalidAuthTokenException();
        }
        if(!user.isVerified) {
            throw new AccountNotVerifiedException();
        }
        return {
            username: user.username,
            emailId: user.emailId,
            lastLoggedInOn: user.lastLoggedInOn,
            isActive: user.isActive,
            isVerified: user.isVerified,
            createdOn: user.createdOn
        }
    }
}