import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { writeFile } from 'fs/promises';
import path = require('path');
import { applicationMigrationFolder } from '@api-assistant/migrations-core';
import { Injectable, Logger } from '@nestjs/common';

interface UpdateMigrationLogicUsecaseInput {
  logic: string;
  applicationId: ObjectId;
  fileName: string;
}

@Injectable()
export class UpdateMigrationLogicUsecase
  implements Usecase<UpdateMigrationLogicUsecaseInput, void>
{
  private readonly logger = new Logger(UpdateMigrationLogicUsecase.name);

  async execute(data: UpdateMigrationLogicUsecaseInput): Promise<void> {
    this.logger.log('Updating migration logic');
    await writeFile(
      path.join(applicationMigrationFolder(data.applicationId), data.fileName),
      data.logic,
      'utf-8'
    );
    this.logger.log('migration logic updated');
    return;
  }
}
