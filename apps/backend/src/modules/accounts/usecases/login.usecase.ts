import { CanBeNull, Usecase, valueIsDefined } from "apps/backend/src/utils/types";
import { LoginDTO } from "../dto/login.dto";
import { User } from "../entities/user.entity";
import { AccountsService } from "../services/accounts.service";
import { PasswordManagerService } from "../services/password-manager.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWTService } from "../services/jwt.service";

@Injectable()
export class LoginUseCase implements Usecase<LoginDTO, string> {

    constructor(
        private readonly accountsService: AccountsService,
        private readonly passwordManagerService: PasswordManagerService,
        private readonly jwtService: JWTService
    ) {}

    async execute(data: LoginDTO): Promise<string> {
        const userAccount: CanBeNull<User> = 
            await this.accountsService.findUserByEmailID(data.emailId);
        if(!valueIsDefined(userAccount)) {
            throw new UnauthorizedException("EmailID or Password is wrong");
        }
        const isPasswordMatched: boolean = await this.passwordManagerService.compare(
            data.password,
            userAccount.password
        )
        if(!isPasswordMatched) {
            throw new UnauthorizedException("EmailID or Password is wrong");
        }
        return this.jwtService.signToken(userAccount._id.toString());
    }
}