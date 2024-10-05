import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';

import { createHash } from 'crypto';
import { CreateAllBuiltinEndpointsUsecase } from '@api-assistant/endpoints-be';
import { Application } from '@api-assistant/application-core';
import { ApplicationRepository } from '../../repositories/application.repository';
import { mkdir } from 'fs/promises';
import { applicationMigrationFolder } from '@api-assistant/migrations-core';

interface CreateApplicationUsecaseInput {
  createdBy: ObjectId;
  name: string;
}

@Injectable()
export class CreateApplicationUsecase
  implements Usecase<CreateApplicationUsecaseInput, Application>
{
  constructor(
    private readonly applicationRepo: ApplicationRepository,
    private readonly createAllBuiltinEndpointsUsecase: CreateAllBuiltinEndpointsUsecase
  ) {}

  async execute(input: CreateApplicationUsecaseInput): Promise<Application> {
    const { name, createdBy } = input;
    const application = await this.applicationRepo.save({
      name,
      createdBy,
      createdOn: new Date(),
    });
    await this.createAllBuiltinEndpointsUsecase.execute({
      userId: createdBy,
      applicationId: application._id,
    });
    await mkdir(applicationMigrationFolder(application._id), {
      recursive: true,
    });
    return application;
  }

  createApiApplicationKey(applicationId: string): string {
    return createHash('sha256')
      .update(applicationId + Date.now())
      .digest('hex');
  }
}
