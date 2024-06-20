import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CORE_ENGINE_UPLOAD_ROOT, crudDbConnectionFactory } from '@api-assistant/crud-engine-be';
import { join } from 'path';
import { rm } from 'fs/promises';
import { existsSync } from 'fs';
import { ProjectMetadataRepository, ProjectRepository } from '@api-assistant/projects-be';
import { ConfigType } from '@nestjs/config';
import { dbConfig } from '@api-assistant/configuration-be';

interface DeleteProjectUsecaseInput {
  projectId: ObjectId;
}

@Injectable()
export class DeleteProjectUsecase
  implements Usecase<DeleteProjectUsecaseInput, string>
{
  constructor(
    private projectsRepository: ProjectRepository,
    private projectMetadataRepository: ProjectMetadataRepository,
    @Inject(dbConfig.KEY) private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  async execute(data: DeleteProjectUsecaseInput): Promise<string> {
    await this.projectsRepository.deleteOne({
      _id: data.projectId,
    });

    await this.projectMetadataRepository.deleteOne({
      projectId: data.projectId,
    });

    const destinationPath = join(
        process.cwd(),
        CORE_ENGINE_UPLOAD_ROOT,
        data.projectId.toString()
    )

    if(existsSync(destinationPath))
        await rm(destinationPath, { recursive: true })

    const { db, connection } = await crudDbConnectionFactory(data.projectId.toString(), this.databaseConfig.DB_URL);

    await db.dropDatabase();

    await connection.close();

    return '';
  }
}
