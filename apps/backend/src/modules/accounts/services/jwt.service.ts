import { CanBeNull } from '@api-assistant/commons';
import { appConfig } from '@api-assistant/configuration-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { verify, sign, JwtPayload, SignOptions } from 'jsonwebtoken';

@Injectable()
export class JWTService {
  private readonly jwtSecret: string;

  private readonly JWT_ALGORITHM: SignOptions['algorithm'] = 'HS512';

  private readonly TOKEN_EXPIRES_IN: string = '1d';

  private logger = new Logger(JWTService.name);

  constructor(
    @Inject(appConfig.KEY)
    private applicationConfig: ConfigType<typeof appConfig>
  ) {
    this.jwtSecret = applicationConfig.JWT_SECRET;
  }

  public signToken(userId: string): string {
    this.logger.log(`Creating JWT for ${userId}`);
    return sign({}, this.jwtSecret, {
      algorithm: this.JWT_ALGORITHM,
      subject: userId,
      expiresIn: this.TOKEN_EXPIRES_IN,
    });
  }

  public verifyToken(token: string): CanBeNull<JwtPayload> {
    this.logger.log(`Verifying JWT ${token}`);
    return verify(token, this.jwtSecret) as JwtPayload;
  }
}
