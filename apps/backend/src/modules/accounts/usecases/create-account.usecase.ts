import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { Usecase } from "apps/backend/src/utils/types";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { User } from "../entities/user.entity";
import { OptionalId } from "mongodb";
import { JWTService } from "../services/jwt.service";
import { PasswordManagerService } from "../services/password-manager.service";

@Injectable()
export class CreateAccountUsecase implements Usecase<CreateAccountDTO, string> {

    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly jwtService: JWTService,
        private readonly passwordManagerService: PasswordManagerService
    ) {}

    public async execute(data: CreateAccountDTO): Promise<string> {
        const createdUserAccount = await this.accountsRepository.save(
            await this.createUserAccountData(data)
        )
        return this.jwtService.signToken(createdUserAccount._id.toString())
    }

    private async createUserAccountData(data: CreateAccountDTO): Promise<OptionalId<User>> {
        return {
            username: data.username,
            password: await this.passwordManagerService.hash(data.password),
            emailId: data.emailId,
            isActive: true,
            isVerified: false,
            createdOn: new Date(),
            lastLoggedInOn: new Date()
        }
    }


}