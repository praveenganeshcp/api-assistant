import { LoginDTO } from '../dto/login.dto';
import { User, UserDetails } from '../entities/user.entity';
import { AccountsService } from '../services/accounts.service';
import { PasswordManagerService } from '../services/password-manager.service';
import { Injectable, Logger } from '@nestjs/common';
import { JWTService } from '../services/jwt.service';
import { InvalidEmailIdPasswordException } from '../exceptions/accounts.exceptions';
import { AccountsRepository } from '../repository/accounts.repository';
import { Usecase, CanBeNull, valueIsDefined } from '@api-assistant/commons';
import { UserDetailsMapper } from '../mappers/user-details.mapper';

const userDetailsMapper = new UserDetailsMapper();

@Injectable()
export class LoginUseCase
  implements Usecase<LoginDTO, { user: UserDetails; token: string }>
{
  private logger = new Logger(LoginUseCase.name);

  constructor(
    private readonly accountsService: AccountsService,
    private readonly passwordManagerService: PasswordManagerService,
    private readonly jwtService: JWTService,
    private readonly accountsRepository: AccountsRepository
  ) {}

  async execute(
    loginDTO: LoginDTO
  ): Promise<{ user: UserDetails; token: string }> {
    this.logger.log(`Logging in user`);
    const userAccount: CanBeNull<User> =
      await this.accountsService.findUserByEmailID(loginDTO.emailId);
    if (!valueIsDefined(userAccount)) {
      throw new InvalidEmailIdPasswordException();
    }
    const isPasswordMatched: boolean =
      await this.passwordManagerService.compare(
        loginDTO.password,
        userAccount.password
      );
    if (!isPasswordMatched) {
      throw new InvalidEmailIdPasswordException();
    }
    this.logger.log(`Updating last logged in timestamp`);
    await this.accountsRepository.updateOne(
      { _id: userAccount._id },
      { $set: { lastLoggedInOn: new Date() } }
    );
    return {
      token: this.jwtService.signToken(userAccount._id.toString()),
      user: userDetailsMapper.from(userAccount),
    };
  }
}
