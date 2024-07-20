import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import {
  CORE_ENGINE_UPLOAD_ROOT,
  crudDbConnectionFactory,
} from '@api-assistant/crud-engine-be';
import { join } from 'path';
import { rm } from 'fs/promises';
import { existsSync } from 'fs';
import { ApplicationRepository } from '@api-assistant/applications-be';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@api-assistant/configuration-be';

interface DeleteApplicationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class DeleteApplicationUsecase
  implements Usecase<DeleteApplicationUsecaseInput, string>
{
  constructor(
    private applicationRepository: ApplicationRepository,
    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
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

    const { db, connection } = await crudDbConnectionFactory(
      data.applicationId.toString(),
      this.databaseConfig.DB_URL
    );

    await db.dropDatabase();

    await connection.close();

    return '';
  }
}
