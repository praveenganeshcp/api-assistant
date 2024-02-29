import { Usecase, valueIsDefined } from '@api-assistant/commons';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';
import { EmailNotificationService } from '../../notification/services/email/email-notification.service';
import { EmailIdNotRegisteredException } from '../exceptions/accounts.exceptions';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '../../../config/app.config';

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
        label: 'Click here to reset password',
        link: `${this.appConfiguration.FE_HOST_ADDRESS}/accounts/reset-password/${userAccount.passwordResetKey}`,
      },
      text: '',
      username: userAccount.username,
    });
  }
}
