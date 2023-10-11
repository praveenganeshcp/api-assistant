import { Usecase, valueIsDefined } from "@api-assistant/utils";
import { AccountsRepository } from "../repository/accounts.repository";
import { InvalidResetPasswordKeyException } from "../exceptions/accounts.exceptions";
import { PasswordManagerService } from "../services/password-manager.service";
import { createPasswordResetKey } from "../utils";
import { Injectable } from "@nestjs/common";

interface ResetPasswordUsecaseInput {
    resetPasswordKey: string;
    password: string;
}

@Injectable()
export class ResetPasswordUsecase implements Usecase<ResetPasswordUsecaseInput, void> {

    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly passwordManagerService: PasswordManagerService,
    ) {}

    async execute(input: ResetPasswordUsecaseInput): Promise<void> {
        const userAccount = await
            this.accountsRepository.findOne({ passwordResetKey: input.resetPasswordKey });
        if(!valueIsDefined(userAccount)) {
            throw new InvalidResetPasswordKeyException();
        }
        await this.accountsRepository.updateOne(
            { _id: userAccount._id },
            { $set: {
                password: await this.passwordManagerService.hash(input.password),
                passwordResetKey: createPasswordResetKey(userAccount.emailId)
            } }
        )
    }
}