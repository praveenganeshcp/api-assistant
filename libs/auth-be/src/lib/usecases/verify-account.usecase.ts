import { CanBeNull, Usecase, valueIsDefined } from '@api-assistant/commons';
import { User, UserDetails } from '../entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { AccountsRepository } from '../repository/accounts.repository';
import { InvalidVerificationKeyException } from '../exceptions/accounts.exceptions';
import { UserDetailsMapper } from '../mappers/user-details.mapper';
import { JWTService } from '../services/jwt.service';

const userDetailsMapper = new UserDetailsMapper();

@Injectable()
export class VerifyAccountUsecase
  implements Usecase<string, { user: UserDetails; token: string }>
{
  private logger = new Logger(VerifyAccountUsecase.name);

  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly jwtService: JWTService
  ) {}

  public async execute(
    verificationKey: string
  ): Promise<{ user: UserDetails; token: string }> {
    this.logger.log(`Verifying account with key ${verificationKey}`);
    const userAccount: CanBeNull<User> = await this.accountsRepository.findOne({
      accountVerificationId: verificationKey,
      isVerified: false,
      isActive: true,
    });
    if (!valueIsDefined(userAccount)) {
      throw new InvalidVerificationKeyException();
    }
    await this.accountsRepository.updateOne(
      { _id: userAccount._id },
      { $set: { isVerified: true, lastLoggedInOn: new Date() } }
    );
    userAccount.isVerified = true;
    userAccount.lastLoggedInOn = new Date();
    this.logger.log(`Marking account with key ${verificationKey} as verified`);
    return {
      user: userDetailsMapper.from(userAccount),
      token: this.jwtService.signToken(userAccount._id.toString()),
    };
  }
}
