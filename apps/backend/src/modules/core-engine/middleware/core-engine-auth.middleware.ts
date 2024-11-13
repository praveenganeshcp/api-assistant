import { Injectable, NestMiddleware, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CanBeNull,
  valueIsNotEmptyString,
  valueIsDefined,
} from '@api-assistant/commons-be';
import { FetchApplicationByAPIKeyUsecase } from '@api-assistant/applications-be';

@Injectable()
export class CoreEngineAuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(CoreEngineAuthenticationMiddleware.name);

  constructor(
    private readonly fetchApplicationByAPIKeyUsecase: FetchApplicationByAPIKeyUsecase
  ) {}

  async use(req: Request, res: Response, next: (error?: unknown) => void) {
    this.logger.log('Running core engine auth middleware');
    const coreEngineApiKey = req.headers[
      'api-assist-auth'
    ] as CanBeNull<string>;
    this.logger.log(coreEngineApiKey);
    if (!valueIsNotEmptyString(coreEngineApiKey)) {
      throw new UnauthorizedException('Invalid api key');
    }
    const applicationMetadata = await this.fetchApplicationByAPIKeyUsecase.execute(coreEngineApiKey);
    if (!valueIsDefined(applicationMetadata)) {
      throw new UnauthorizedException('Invalid api key');
    }
    req.port = applicationMetadata.port;
    next();
  }
}
