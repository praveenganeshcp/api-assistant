import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CanBeNull,
  valueIsNotEmptyString,
  valueIsDefined,
} from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';

@Injectable()
export class CoreEngineAuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(CoreEngineAuthenticationMiddleware.name);

  async use(req: any, res: Response, next: (error?: unknown) => void) {
    this.logger.log('Running core engine auth middleware');
    // const coreEngineApiKey = req.headers[
    //   'api-assist-auth'
    // ] as CanBeNull<string>;
    // this.logger.log(coreEngineApiKey);
    // if (!valueIsNotEmptyString(coreEngineApiKey)) {
    //   throw 'dwdw';
    // }
    // const applicationMetadata = "ss";
    // if (!valueIsDefined(applicationMetadata)) {
    //   throw 'Invald api key';
    // }
    req['applicationId'] = new ObjectId('66fc2a4f1e9d8fd0e4a14fb1');
    next();
  }
}
