import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { JWTService } from '../services/jwt.service';
import { AccountsService } from '../services/accounts.service';
import { UserDetails } from '../entities/user.entity';
import { InvalidAuthTokenException } from '../exceptions/accounts.exceptions';
import { valueIsNotEmptyString, valueIsDefined } from '@api-assistant/commons-be';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UserDetailsMapper } from '../mappers/user-details.mapper';

const userDetailsMapper = new UserDetailsMapper();

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(AuthenticationMiddleware.name);

  constructor(
    private jwtService: JWTService,
    private accountsService: AccountsService
  ) {}

  // TODO: use express req type
  async use(req: any, res: Response, next: (error?: unknown) => void) {
    this.logger.log('Running auth middleware');
    try {
      const jwt: string = req.cookies.token || '';
      req['authUser'] = await this.fetchUserDetails(jwt);
      this.logger.log(`User ${req['authUser'].username} is authenticated`);
      next();
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new InvalidAuthTokenException();
      }
      throw err;
    }
  }

  private async fetchUserDetails(jwt: string): Promise<UserDetails> {
    if (!valueIsNotEmptyString(jwt)) {
      throw new InvalidAuthTokenException();
    }
    const jwtPayload = this.jwtService.verifyToken(jwt);
    if (!valueIsDefined(jwtPayload)) {
      throw new InvalidAuthTokenException();
    }
    const user = await this.accountsService.findUserById(
      jwtPayload.sub as string
    );
    if (!valueIsDefined(user)) {
      throw new InvalidAuthTokenException();
    }
    return userDetailsMapper.from(user);
  }
}
