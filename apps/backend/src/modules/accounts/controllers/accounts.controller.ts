import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Res,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateAccountUsecase,
  LoginUseCase,
  VerifyAccountUsecase,
  SendResetPasswordLinkUsecase,
  ResetPasswordUsecase,
  AccountsService,
  UserDetails,
} from '@api-assistant/auth-be';
import {
  CreateAccountDTO,
  LoginDTO,
  VerifyAccountDTO,
  ResetPasswordLinkDTO,
  ResetPasswordDTO,
  EmailIdCheckerDTO,
} from '../dto/accounts.dto';
import { AuthUser } from '@api-assistant/commons-be';

@Controller('accounts')
export class AccountsController {
  private logger = new Logger(AccountsController.name);

  constructor(
    private readonly createAccountUsecase: CreateAccountUsecase,
    private readonly loginUsecase: LoginUseCase,
    private verifyAccountUsecase: VerifyAccountUsecase,
    private sendResetPasswordLinkUsecase: SendResetPasswordLinkUsecase,
    private resetPasswordUsecase: ResetPasswordUsecase,
    private accountsService: AccountsService
  ) {}

  @Post('signup')
  public async createAccount(
    @Body() createAccountPayload: CreateAccountDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    this.logger.log(
      `Handling request to create new account for ${createAccountPayload.username}`
    );
    const { token, user } = await this.createAccountUsecase.execute(
      createAccountPayload
    );
    this.logger.log(`User account created for user ${user.username}`);
    response.cookie('token', token).json(user);
  }

  @Get('profile')
  public async fetchProfile(
    @AuthUser() userDetails: UserDetails
  ): Promise<UserDetails> {
    this.logger.log(`Fetching profile for user ${userDetails.username}`);
    return userDetails;
  }

  @Post('login')
  public async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response
  ) {
    this.logger.log(`${loginDTO.emailId} is logging in`);
    const { token, user } = await this.loginUsecase.execute(loginDTO);
    this.logger.log(`${user.username} logged in`);
    response.cookie('token', token).status(200).json(user);
  }

  @Post('logout')
  public logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '').status(200).json({});
    this.logger.log('Logged out');
  }

  @Patch('verify-account')
  public async verifyAccount(
    @Res({ passthrough: true }) response: Response,
    @Body() verifyAccountDTO: VerifyAccountDTO
  ) {
    const { verificationKey } = verifyAccountDTO;
    this.logger.log(`verifying account with key ${verificationKey}`);
    const { token, user } = await this.verifyAccountUsecase.execute(
      verificationKey
    );
    this.logger.log(`Account with key ${verificationKey} is verified`);
    response.cookie('token', token).json(user);
  }

  @Post('reset-password-link')
  public async sendResetPasswordLink(
    @Body() resetPasswordLinkDTO: ResetPasswordLinkDTO
  ) {
    this.logger.log(`Sending password reset link`);
    await this.sendResetPasswordLinkUsecase.execute(
      resetPasswordLinkDTO.emailId
    );
    this.logger.log('Password reset link sent');
  }

  @Post('reset-password')
  public async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    this.logger.log(
      `resetting password for key ${resetPasswordDTO.resetPasswordKey}`
    );
    await this.resetPasswordUsecase.execute({
      resetPasswordKey: resetPasswordDTO.resetPasswordKey,
      oldPassword: resetPasswordDTO.oldPassword,
      newPassword: resetPasswordDTO.newPassword,
    });
    this.logger.log(
      `password reset completed for key ${resetPasswordDTO.resetPasswordKey}`
    );
  }

  @Post('is-emailid-registered')
  public async checkIfEmailRegistered(
    @Body() emailIdCheckerDTO: EmailIdCheckerDTO
  ): Promise<{ isEmailIdRegistered: boolean }> {
    this.logger.log(
      `Check if emaild ${emailIdCheckerDTO.emailId} is registered`
    );
    const existingUser = await this.accountsService.findUserByEmailID(
      emailIdCheckerDTO.emailId
    );
    return { isEmailIdRegistered: existingUser !== null };
  }
}
