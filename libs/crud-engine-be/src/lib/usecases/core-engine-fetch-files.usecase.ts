import { Usecase } from '@api-assistant/commons-be';
import { existsSync, statSync } from 'fs';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { CORE_ENGINE_UPLOAD_ROOT, removeRootPath } from '../utils';

interface CoreEngineFetchFilesUsecaseInput {
  applicationId: string;
  path: string;
}

interface CoreEngineFetchFilesUsecaseOutput {
  name: string;
  isFile: boolean;
  path: string;
}

@Injectable()
export class CoreEngineFetchFilesUsecase
  implements
    Usecase<
      CoreEngineFetchFilesUsecaseInput,
      CoreEngineFetchFilesUsecaseOutput[]
    >
{
  private logger = new Logger(CoreEngineFetchFilesUsecase.name);
  async execute(
    input: CoreEngineFetchFilesUsecaseInput
  ): Promise<CoreEngineFetchFilesUsecaseOutput[]> {
    const { path, applicationId } = input;
    this.logger.log(
      `Fetching files in application id ${applicationId} for path ${path}`
    );
    const fullPath = join(
      process.cwd(),
      CORE_ENGINE_UPLOAD_ROOT,
      applicationId,
      path
    );
    if (!existsSync(fullPath)) {
      return [];
    }
    const objects = await readdir(fullPath);
    return objects.map((objectName) => {
      const objectFullPath = join(fullPath, objectName);
      return {
        name: objectName,
        isFile: statSync(objectFullPath).isFile(),
        path: removeRootPath(objectFullPath),
      };
    });
  }
}
