import { Injectable } from '@nestjs/common';
import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';

import { createHash } from 'crypto';
import { CreateAllBuiltinEndpointsUsecase } from '@api-assistant/application-endpoints-be';
import { Application } from '@api-assistant/application-core';
import { ApplicationRepository } from '../../repositories/application.repository';
import { mkdir } from 'fs/promises';
import { applicationMigrationFolder } from '@api-assistant/application-migrations-core';
import { BootstrapApplicationUsecase } from '@api-assistant/application-endpoints-be';

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
    private readonly createAllBuiltinEndpointsUsecase: CreateAllBuiltinEndpointsUsecase,
    private readonly bootstrapCloudCodeUsecase: BootstrapApplicationUsecase,
  ) {}

  async execute(input: CreateApplicationUsecaseInput): Promise<Application> {
    const { name, createdBy } = input;
    const application = await this.applicationRepo.save({
      name,
      createdBy,
      createdOn: new Date(),
    });
    await mkdir(applicationMigrationFolder(application._id), {
      recursive: true,
    });
    await this.bootstrapCloudCodeUsecase.execute({
      applicationId: application._id,
      port: 5555
    })
    await this.createAllBuiltinEndpointsUsecase.execute({
      userId: createdBy,
      applicationId: application._id,
    });
    return application;
  }

  createApiApplicationKey(applicationId: string): string {
    return createHash('sha256')
      .update(applicationId + Date.now())
      .digest('hex');
  }
}
