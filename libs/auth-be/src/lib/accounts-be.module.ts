import { Module } from '@nestjs/common';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { AccountsRepository } from './repository/accounts.repository';
import { AccountsService } from './services/accounts.service';
import { JWTService } from './services/jwt.service';
import { PasswordManagerService } from './services/password-manager.service';
import { CreateAccountUsecase } from './usecases/create-account.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { ResetPasswordUsecase } from './usecases/reset-password.usecase';
import { SendResetPasswordLinkUsecase } from './usecases/send-reset-password-link.usecase';
import { VerifyAccountUsecase } from './usecases/verify-account.usecase';
import { IsEmailIDUnique } from './validators/emailid.validator';

@Module({
  providers: [
    AccountsService,
    AccountsRepository,
    IsEmailIDUnique,
    CreateAccountUsecase,
    JWTService,
    PasswordManagerService,
    LoginUseCase,
    VerifyAccountUsecase,
    SendResetPasswordLinkUsecase,
    ResetPasswordUsecase,
    AuthenticationMiddleware,
  ],
  exports: [
    IsEmailIDUnique,
    CreateAccountUsecase,
    AccountsService,
    JWTService,
    LoginUseCase,
    VerifyAccountUsecase,
    SendResetPasswordLinkUsecase,
    ResetPasswordUsecase,
    AuthenticationMiddleware,
  ],
})
export class AccountsBeModule {}
