import { Usecase, valueIsDefined } from '@api-assistant/commons-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { EmailIdNotRegisteredException } from '../exceptions/accounts.exceptions';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '@api-assistant/configuration-be';
import { EmailNotificationService } from '@api-assistant/notifications-be';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class SendResetPasswordLinkUsecase implements Usecase<string, void> {
  @Inject(appConfig.KEY)
  private appConfiguration!: ConfigType<typeof appConfig>;

  private logger = new Logger(SendResetPasswordLinkUsecase.name);

  constructor(
    private accountsService: AccountsService,
    private emailNotificationService: EmailNotificationService
  ) {}

  async execute(emailId: string): Promise<void> {
    this.logger.log('Sending password reset link');
    const userAccount = await this.accountsService.findUserByEmailID(emailId);
    if (!valueIsDefined(userAccount)) {
      throw new EmailIdNotRegisteredException();
    }
    await this.emailNotificationService.notify({
      toEmailId: userAccount.emailId,
      subject: 'Reset password',
      cta: {
        label: 'Reset password',
        copy: 'Click the button below to reset your password:',
        link: `${this.appConfiguration.FE_HOST_ADDRESS}/accounts/reset-password/${userAccount.passwordResetKey}`,
      },
      text: 'You are receiving this email because we received a request to reset your password for your account.',
      username: userAccount.username,
      title: "Reset password"
    });
  }
}
