import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  UploadedFiles,
  Logger,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CoreEngineProjectId } from '@api-assistant/commons-be';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import {
  CoreEngineCRUDUsecase,
  CoreEngineFetchCollectionsUsecase,
  CoreEngineFetchFilesUsecase,
  CORE_ENGINE_UPLOAD_ROOT,
  DeleteProjectUsecase,
} from '@api-assistant/crud-engine-be';
import { ObjectId } from 'mongodb';

@Controller('core-engine')
export class CoreEngineController {
  private logger = new Logger(CoreEngineController.name);

  constructor(
    private coreEngineCRUDUsecase: CoreEngineCRUDUsecase,
    private coreEngineFetchCollectionsUsecase: CoreEngineFetchCollectionsUsecase,
    private coreEngineFetchFilesUsecase: CoreEngineFetchFilesUsecase,
    private deleteProjectUsecase: DeleteProjectUsecase
  ) {}

  @Get('collections')
  fetchDbCollections(@CoreEngineProjectId() projectId: string) {
    return this.coreEngineFetchCollectionsUsecase.execute(projectId);
  }

  @Post('api/:path')
  performPostCrud(@Param('path') endpointUrl: string, @Body() reqBody: any) {
    return this.coreEngineCRUDUsecase.execute({
      url: endpointUrl,
      reqBody,
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

  @Delete('project')
  async deleteProject(@CoreEngineProjectId() projectId: string) {
    return this.deleteProjectUsecase.execute({
      projectId: new ObjectId(projectId),
    });
  }
}
