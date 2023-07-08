import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { Usecase } from "apps/backend/src/utils/types";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { User } from "../entities/user.entity";
import { OptionalId } from "mongodb";
import * as bcrypt from "bcrypt";
import { JWTService } from "../services/jwt.service";

@Injectable()
export class CreateAccountUsecase implements Usecase<CreateAccountDTO, string> {

    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly jwtService: JWTService
    ) {}

    public async execute(data: CreateAccountDTO): Promise<string> {
        const createdUserAccount = await this.accountsRepository.save(
            this.createUserAccountData(data)
        )
        return this.jwtService.signToken(createdUserAccount._id.toString())
    }

    private createUserAccountData(data: CreateAccountDTO): OptionalId<User> {
        return {
            username: data.username,
            password: this.hashPassword(data.password),
            emailId: data.emailId,
            isActive: true,
            isVerified: false,
            createdOn: new Date(),
            lastLoggedInOn: new Date()
        }
    }

    private hashPassword(plainPassword: string): string {
        return bcrypt.hashSync(plainPassword, 10);
    }

}