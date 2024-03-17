import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CanBeNull,
  valueIsNotEmptyString,
  valueIsDefined,
} from '@api-assistant/commons-be';
import { ProjectMetadataRepository } from '@api-assistant/projects-be';

@Injectable()
export class CoreEngineAuthenticationMiddleware implements NestMiddleware {
  private logger = new Logger(CoreEngineAuthenticationMiddleware.name);

  constructor(private projectsMetadataRepo: ProjectMetadataRepository) {}

  async use(req: Request, res: Response, next: (error?: unknown) => void) {
    this.logger.log('Running core engine auth middleware');
    const coreEngineApiKey = req.headers[
      'api-assist-auth'
    ] as CanBeNull<string>;
    this.logger.log(coreEngineApiKey);
    if (!valueIsNotEmptyString(coreEngineApiKey)) {
      throw 'dwdw';
    }
    const projectMetadata = await this.projectsMetadataRepo.findOne({
      apiKey: coreEngineApiKey,
    });
    if (!valueIsDefined(projectMetadata)) {
      throw 'Invald api key';
    }
    req['projectId'] = projectMetadata.projectId.toString();
    next();
  }
}
