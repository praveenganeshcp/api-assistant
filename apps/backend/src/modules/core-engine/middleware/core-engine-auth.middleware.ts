import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CanBeNull,
  valueIsNotEmptyString,
  valueIsDefined,
} from '@api-assistant/commons-be';

@Injectable()
export class CoreEngineAuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(CoreEngineAuthenticationMiddleware.name);


  async use(req: any, res: Response, next: (error?: unknown) => void) {
    // this.logger.log('Running core engine auth middleware');
    // const coreEngineApiKey = req.headers[
    //   'api-assist-auth'
    // ] as CanBeNull<string>;
    // this.logger.log(coreEngineApiKey);
    // if (!valueIsNotEmptyString(coreEngineApiKey)) {
    //   throw 'dwdw';
    // }
    // const projectMetadata = "ss";
    // if (!valueIsDefined(projectMetadata)) {
    //   throw 'Invald api key';
    // }
    // req['projectId'] = projectMetadata.projectId.toString();
    next();
  }
}
