import { Inject, Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { Usecase } from "@api-assistant/utils";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { User, UserDetails } from "../entities/user.entity";
import { OptionalId } from "mongodb";
import { JWTService } from "../services/jwt.service";
import { PasswordManagerService } from "../services/password-manager.service";
import { EmailNotificationService } from "../../notification/services/email/email-notification.service";
import { appConfig } from "apps/backend/src/config/app.config";
import { ConfigType } from "@nestjs/config";
import { createHash } from "crypto";

@Injectable()
export class CreateAccountUsecase implements Usecase<CreateAccountDTO, {user: UserDetails, token: string}> {

    @Inject(appConfig.KEY)
    private appConfiguration!: ConfigType<typeof appConfig>

    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly jwtService: JWTService,
        private readonly passwordManagerService: PasswordManagerService,
        private readonly emailNotificationService: EmailNotificationService,
    ) {}

    public async execute(data: CreateAccountDTO): Promise<{user: UserDetails, token: string}> {
        const newUserAccount: User = await this.accountsRepository.save(
            await this.createUserAccountData(data)
        )
        this.sendAccountVerificationLink(newUserAccount);
        return {
            user: {
                emailId: newUserAccount.emailId,
                username: newUserAccount.username,
                lastLoggedInOn: newUserAccount.lastLoggedInOn,
                isActive: newUserAccount.isActive,
                isVerified: newUserAccount.isVerified,
                createdOn: newUserAccount.createdOn
            },
            token: this.jwtService.signToken(newUserAccount._id.toString())
        }
    }

    private async createUserAccountData(data: CreateAccountDTO): Promise<OptionalId<User>> {
        return {
            username: data.username,
            password: await this.passwordManagerService.hash(data.password),
            emailId: data.emailId,
            isActive: true,
            isVerified: false,
            createdOn: new Date(),
            lastLoggedInOn: null,
            accountVerificationId: this.createAccountVerificationId(data.emailId)
        }
    }

    private createAccountVerificationId(emailId: string): string {
        return createHash('sha256').update(emailId).digest('hex');
    }

    private sendAccountVerificationLink(newUserAccount: User): void {
        this.emailNotificationService.notify({
            toEmailId: newUserAccount.emailId,
            subject: "Welcome to API Assistant",
            cta: {
                label: "Verify Account",
                link: `${this.appConfiguration.FE_HOST_ADDRESS}/verify-account/${newUserAccount.accountVerificationId}`
            },
            text: "Your account has been successfully created. Click on the below link to verify your email id.",
            username: newUserAccount.username
        })
    }


}