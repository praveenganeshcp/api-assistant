import { Usecase } from '@api-assistant/commons-be';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { writeFile } from 'fs/promises';
import { crudAppConfig } from '@api-assistant/configuration-be';
import { ConfigType } from '@nestjs/config';

interface CreateMigrationUsecaseInput {
  fileName: string;
  applicationId: ObjectId;
}

@Injectable()
export class CreateMigrationUsecase
  implements Usecase<CreateMigrationUsecaseInput, void>
{
  private readonly logger = new Logger(CreateMigrationUsecase.name);

  constructor(
    @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>
  ) {}

  async execute(data: CreateMigrationUsecaseInput): Promise<void> {
    this.logger.log('creating migration', data);
    const timestamp = this.generateTimestamp();
    const fileName = `${timestamp}-${data.fileName}.ts`;
    this.logger.log('file name created' + fileName);
    const filePath = `${this.crudApplicationConfig.ROOTDIR}/${data.applicationId.toString()}/src/migration-files/${fileName}`;
    await writeFile(
      filePath,
      this.generateBoilerplateCode(data.fileName, timestamp),
      'utf8'
    );
    this.logger.log('migration created');
    return;
  }

  private generateBoilerplateCode(description: string, timestamp: string) {
    return `
            /**
            * Migration: ${description}
            * Generated at: ${timestamp}
            */

            module.exports = {
                up: async (queryInterface, Sequelize) => {
                    // Add migration logic here (e.g., create or alter tables)
                },

                down: async (queryInterface, Sequelize) => {
                    // Revert migration logic here
                },
            };`;
  }

  private generateTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}
