import { Usecase, valueIsDefined } from '@api-assistant/commons';
import { AccountsRepository } from '../repository/accounts.repository';
import {
  InvalidResetPasswordKeyException,
  IncorrectOldPasswordException,
} from '../exceptions/accounts.exceptions';
import { PasswordManagerService } from '../services/password-manager.service';
import { createPasswordResetKey } from '../utils';
import { Injectable, Logger } from '@nestjs/common';

interface ResetPasswordUsecaseInput {
  resetPasswordKey: string;
  oldPassword: string;
  newPassword: string;
}

@Injectable()
export class ResetPasswordUsecase
  implements Usecase<ResetPasswordUsecaseInput, void>
{
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly passwordManagerService: PasswordManagerService
  ) {}

  private logger = new Logger(ResetPasswordUsecase.name);

  async execute(input: ResetPasswordUsecaseInput): Promise<void> {
    this.logger.log(`resetting password for key ${input.resetPasswordKey}`);
    const userAccount = await this.accountsRepository.findOne({
      passwordResetKey: input.resetPasswordKey,
    });
    if (!valueIsDefined(userAccount)) {
      throw new InvalidResetPasswordKeyException();
    }
    const isOldPasswordMatch: boolean =
      await this.passwordManagerService.compare(
        input.oldPassword,
        userAccount.password
      );
    if (!isOldPasswordMatch) {
      throw new IncorrectOldPasswordException();
    }
    await this.accountsRepository.updateOne(
      { _id: userAccount._id },
      {
        $set: {
          password: await this.passwordManagerService.hash(input.newPassword),
          passwordResetKey: createPasswordResetKey(userAccount.emailId),
        },
      }
    );
    this.logger.log('Password updated in DB');
  }
}
