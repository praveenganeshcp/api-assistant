import { CanBeNull, Usecase, valueIsDefined } from "apps/backend/src/utils/types";
import { LoginDTO } from "../dto/login.dto";
import { User } from "../entities/user.entity";
import { AccountsService } from "../services/accounts.service";
import { PasswordManagerService } from "../services/password-manager.service";
import { Injectable } from "@nestjs/common";
import { JWTService } from "../services/jwt.service";
import { AccountNotVerifiedException, InvalidEmailIdPasswordException } from "../exceptions/accounts.exceptions";
import { AccountsRepository } from "../repository/accounts.repository";


@Injectable()
export class LoginUseCase implements Usecase<LoginDTO, string> {

    constructor(
        private readonly accountsService: AccountsService,
        private readonly passwordManagerService: PasswordManagerService,
        private readonly jwtService: JWTService,
        private readonly accountsRepository: AccountsRepository
    ) {}

    async execute(loginDTO: LoginDTO): Promise<string> {
        const userAccount: CanBeNull<User> = 
            await this.accountsService.findUserByEmailID(loginDTO.emailId);
        if(!valueIsDefined(userAccount)) {
            throw new InvalidEmailIdPasswordException();
        }
        const isPasswordMatched: boolean = await this.passwordManagerService.compare(
            loginDTO.password,
            userAccount.password
        )
        if(!isPasswordMatched) {
            throw new InvalidEmailIdPasswordException();
        }
        if(!userAccount.isVerified) {
            throw new AccountNotVerifiedException();
        }
        await this.accountsRepository.updateOne(
            {_id: userAccount._id}, 
            {$set: {lastLoggedInOn: new Date()}}
        )
        return this.jwtService.signToken(userAccount._id.toString());
    }
}