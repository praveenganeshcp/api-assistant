import { Usecase, valueIsDefined } from "@api-assistant/utils";
import { Inject, Injectable } from "@nestjs/common";
import { AccountsService } from "../services/accounts.service";
import { EmailNotificationService } from "../../notification/services/email/email-notification.service";
import { EmailIdNotRegisteredException } from "../exceptions/accounts.exceptions";
import { ConfigType } from "@nestjs/config";
import { appConfig } from "apps/backend/src/config/app.config";

@Injectable()
export class SendResetPasswordLinkUsecase implements Usecase<string, void> {

    @Inject(appConfig.KEY)
    private appConfiguration!: ConfigType<typeof appConfig>

    constructor(
        private accountsService: AccountsService,
        private emailNotificationService: EmailNotificationService
    ) {}
    
    async execute(emailId: string): Promise<void> {
        const userAccount = await this.accountsService.findUserByEmailID(
            emailId
        )
        if(!valueIsDefined(userAccount)) {
            throw new EmailIdNotRegisteredException();
        }
        this.emailNotificationService.notify({
            toEmailId: userAccount.emailId,
            subject: "Reset password",
            cta: {
                label: "Click here to reset password",
                link: `${this.appConfiguration.FE_HOST_ADDRESS}/reset-password/${userAccount.passwordResetKey}`
            },
            text: "",
            username: userAccount.username
        })
    }
}