import { Usecase } from '@api-assistant/commons-be';
import { writeFile } from 'fs/promises';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { crudAppConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';
import { ObjectId } from 'mongodb';

interface UpdateMigrationLogicUsecaseInput {
  applicationId: ObjectId,
  logic: string;
  fileName: string;
}

@Injectable()
export class UpdateMigrationLogicUsecase
  implements Usecase<UpdateMigrationLogicUsecaseInput, void>
{
  private readonly logger = new Logger(UpdateMigrationLogicUsecase.name);

  constructor(
    @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
  ) {}

  async execute(data: UpdateMigrationLogicUsecaseInput): Promise<void> {
    this.logger.log('Updating migration logic');
    await writeFile(
      `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}/src/migration-files/${data.fileName}`,
      data.logic,
      'utf-8'
    );
    this.logger.log('migration logic updated');
    return;
  }
}
