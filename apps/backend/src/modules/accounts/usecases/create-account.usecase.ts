import { Inject, Injectable, Logger } from '@nestjs/common';
import { AccountsRepository } from '../repository/accounts.repository';
import { Usecase } from '@api-assistant/commons';
import { CreateAccountDTO } from '../dto/create-account.dto';
import { User, UserDetails } from '../entities/user.entity';
import { OptionalId } from 'mongodb';
import { JWTService } from '../services/jwt.service';
import { PasswordManagerService } from '../services/password-manager.service';
import { EmailNotificationService } from '../../notification/services/email/email-notification.service';
import { ConfigType } from '@nestjs/config';
import { createHash } from 'crypto';
import { createPasswordResetKey } from '../utils';
import { UserDetailsMapper } from '../mappers/user-details.mapper';
import { appConfig } from '@api-assistant/configuration-be';

const userDetailsMapper = new UserDetailsMapper();

@Injectable()
export class CreateAccountUsecase
  implements Usecase<CreateAccountDTO, { user: UserDetails; token: string }>
{
  @Inject(appConfig.KEY)
  private appConfiguration!: ConfigType<typeof appConfig>;

  private logger = new Logger(CreateAccountUsecase.name);

  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly jwtService: JWTService,
    private readonly passwordManagerService: PasswordManagerService,
    private readonly emailNotificationService: EmailNotificationService
  ) {}

  public async execute(
    data: CreateAccountDTO
  ): Promise<{ user: UserDetails; token: string }> {
    this.logger.log(`Creating new account in db for user ${data.username}`);
    const newUserAccount: User = await this.accountsRepository.save(
      await this.createUserAccountData(data)
    );
    this.logger.log(`New account created in db for user ${data.username}`);
    await this.sendAccountVerificationLink(newUserAccount);
    this.logger.log(`verification link sent for ${data.username}`);
    return {
      user: userDetailsMapper.from(newUserAccount),
      token: this.jwtService.signToken(newUserAccount._id.toString()),
    };
  }

  private async createUserAccountData(
    data: CreateAccountDTO
  ): Promise<OptionalId<User>> {
    return {
      username: data.username,
      password: await this.passwordManagerService.hash(data.password),
      emailId: data.emailId,
      isActive: true,
      isVerified: false,
      createdOn: new Date(),
      lastLoggedInOn: null,
      accountVerificationId: this.createAccountVerificationId(data.emailId),
      passwordResetKey: createPasswordResetKey(data.emailId),
    };
  }

  private createAccountVerificationId(emailId: string): string {
    return createHash('sha256').update(emailId).digest('hex');
  }

  private async sendAccountVerificationLink(
    newUserAccount: User
  ): Promise<void> {
    await this.emailNotificationService.notify({
      toEmailId: newUserAccount.emailId,
      subject: 'Welcome to API Assistant',
      cta: {
        label: 'Verify Account',
        link: `${this.appConfiguration.FE_HOST_ADDRESS}/accounts/verify-account/${newUserAccount.accountVerificationId}`,
      },
      text: 'Your account has been successfully created. Click on the below link to verify your email id.',
      username: newUserAccount.username,
    });
  }
}
