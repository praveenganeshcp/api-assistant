import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import {
  CORE_ENGINE_UPLOAD_ROOT,
  CRUD_DB_CONNECTION,
} from '@api-assistant/application-crud-engine-be';
import { join } from 'path';
import { rm } from 'fs/promises';
import { existsSync } from 'fs';
import { ApplicationRepository } from '@api-assistant/applications-be';

interface DeleteApplicationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class DeleteApplicationUsecase
  implements Usecase<DeleteApplicationUsecaseInput, string>
{
  constructor(
    private applicationRepository: ApplicationRepository,
    @Inject(CRUD_DB_CONNECTION)
    private readonly connection: MongoClient
  ) {}

  async execute(data: DeleteApplicationUsecaseInput): Promise<string> {
    await this.applicationRepository.deleteOne({
      _id: data.applicationId,
    });

    const destinationPath = join(
      process.cwd(),
      CORE_ENGINE_UPLOAD_ROOT,
      data.applicationId.toString()
    );

    if (existsSync(destinationPath))
      await rm(destinationPath, { recursive: true });

    const db = this.connection.db(`api-crud-${data.applicationId.toString()}`);

    await db.dropDatabase();

    return '';
  }
}
