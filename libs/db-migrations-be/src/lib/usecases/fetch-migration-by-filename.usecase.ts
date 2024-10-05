import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { readFile } from 'fs/promises';
import { applicationMigrationFolder } from '@api-assistant/migrations-core';
import path = require('path');
import { Injectable } from '@nestjs/common';

interface FetchMigrationByFileNameUsecaseInput {
  applicationId: ObjectId;
  fileName: string;
}

interface FetchMigrationByFileNameUsecaseOutput {
  logic: string;
}

@Injectable()
export class FetchMigrationByFileNameUsecase
  implements
    Usecase<
      FetchMigrationByFileNameUsecaseInput,
      FetchMigrationByFileNameUsecaseOutput
    >
{
  async execute(
    data: FetchMigrationByFileNameUsecaseInput
  ): Promise<FetchMigrationByFileNameUsecaseOutput> {
    const logic = await readFile(
      path.join(applicationMigrationFolder(data.applicationId), data.fileName),
      'utf-8'
    );
    return {
      logic,
    };
  }
}
