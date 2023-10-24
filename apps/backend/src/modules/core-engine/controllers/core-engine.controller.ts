import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Query,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CoreEngineProjectId } from '@api-assistant/utils';
import { CoreEngineCRUDUsecase } from '../usecases/core-engine-crud.usecase';
import { CoreEngineCRUDDto } from '../core-engine-dto';
import { CoreEngineFetchCollectionsUsecase } from '../usecases/core-engine-fetch-collections.usecase';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { CoreEngineFetchFilesUsecase } from '../usecases/core-engine-fetch-files.usecase';
import { CORE_ENGINE_UPLOAD_ROOT } from '../utils';

@Controller('core-engine')
export class CoreEngineController {
  private logger = new Logger(CoreEngineController.name);

  constructor(
    private coreEngineCRUDUsecase: CoreEngineCRUDUsecase,
    private coreEngineFetchCollectionsUsecase: CoreEngineFetchCollectionsUsecase,
    private coreEngineFetchFilesUsecase: CoreEngineFetchFilesUsecase
  ) {}

  @Get('collections')
  fetchDbCollections(@CoreEngineProjectId() projectId: string) {
    return this.coreEngineFetchCollectionsUsecase.execute(projectId);
  }

  @Post('crud')
  performCrud(
    @CoreEngineProjectId() projectId: string,
    @Body() body: CoreEngineCRUDDto
  ) {
    return this.coreEngineCRUDUsecase.execute({
      ...body,
      projectId,
    });
  }

  @Post('files')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination(req, file, callback) {
          const logger = new Logger('FileuploadDestinationMiddleware');
          const destinationPath = join(
            process.cwd(),
            CORE_ENGINE_UPLOAD_ROOT,
            req.projectId,
            file.fieldname || ''
          );
          logger.log('Found path ' + destinationPath);
          if (!existsSync(destinationPath)) {
            logger.log(`Creating directory ${destinationPath}`);
            mkdirSync(destinationPath, { recursive: true });
          }
          callback(null, destinationPath);
        },
        filename: (req: Express.Request, file, cb) => {
          const logger = new Logger('FileNameDestinationMiddleware');
          logger.log(`Found file name ${file.originalname}`);
          cb(null, file.originalname);
        },
      }),
    })
  )
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response = files.map((file) => ({
      path: file.destination,
      name: file.originalname,
    }));
    this.logger.log(`Files uploaded ${JSON.stringify(response)}`);
    return response;
  }

  @Get('files')
  fetchFiles(
    @CoreEngineProjectId() projectId: string,
    @Query('path') path: string
  ) {
    return this.coreEngineFetchFilesUsecase.execute({
      path,
      projectId,
    });
  }
}
