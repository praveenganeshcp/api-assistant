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
  Patch,
  Res,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CoreEngineApplicationId } from '@api-assistant/commons-be';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import {
  CoreEngineCRUDUsecase,
  CoreEngineFetchCollectionsUsecase,
  CoreEngineFetchFilesUsecase,
  CORE_ENGINE_UPLOAD_ROOT,
  DeleteApplicationUsecase,
  CoreEngineSignupUsecase,
  CoreEngineLoginUsecase,
} from '@api-assistant/crud-engine-be';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';

@Controller('core-engine')
export class CoreEngineController {
  private logger = new Logger(CoreEngineController.name);

  constructor(
    private coreEngineCRUDUsecase: CoreEngineCRUDUsecase,
    private coreEngineFetchFilesUsecase: CoreEngineFetchFilesUsecase,
    private readonly coreEngineSignupUsecase: CoreEngineSignupUsecase,
    private readonly coreEngineLoginUsecase: CoreEngineLoginUsecase
  ) {}

  @Post('api/signup')
  async signupAccount(
    @Body() reqBody: any,
    @CoreEngineApplicationId() applicationId: ObjectId,
    @Res() response: Response
  ) {
    const { user, token } = await this.coreEngineSignupUsecase.execute({
      url: `/signup`,
      placeholderDataSouce: {
        requestBody: reqBody,
        queryParams: {},
        pathParams: {},
      },
      applicationId,
      method: 'POST',
    });
    response.cookie('token', token).json(user);
  }

  @Post('api/login')
  async loginAccount(
    @Body() reqBody: any,
    @CoreEngineApplicationId() applicationId: ObjectId,
    @Res() response: Response
  ) {
    const { user, token } = await this.coreEngineLoginUsecase.execute({
      url: `/login`,
      placeholderDataSouce: {
        requestBody: reqBody,
        queryParams: {},
        pathParams: {},
      },
      applicationId,
      method: 'POST',
    });
    response.cookie('token', token).status(200).json(user);
  }

  @Post('api/logout')
  async logoutAccount(@Res() response: Response) {
    response.cookie('token', '', { maxAge: 0 }).status(200).send();
  }

  @Post('api/*')
  performPostCrud(
    @Req() request: Request,
    @Param() params: any,
    @Body() reqBody: any,
    @Query() queryParams: any,
    @CoreEngineApplicationId() applicationId: ObjectId
  ) {
    return this.coreEngineCRUDUsecase.execute({
      token: request.cookies['token'],
      url: `/${params[0]}`,
      placeholderDataSouce: {
        requestBody: reqBody,
        queryParams,
        pathParams: {},
      },
      applicationId,
      method: 'POST',
    });
  }

  @Get('api/*')
  performGetCrud(
    @Param() params: any,
    @Query() queryParams: any,
    @CoreEngineApplicationId() applicationId: ObjectId
  ) {
    return this.coreEngineCRUDUsecase.execute({
      url: `/${params[0]}`,
      placeholderDataSouce: {
        requestBody: {},
        queryParams,
        pathParams: {},
      },
      applicationId,
      method: 'GET',
    });
  }

  @Delete('api/*')
  performDeleteCrud(
    @Param() params: any,
    @Query() queryParams: any,
    @CoreEngineApplicationId() applicationId: ObjectId
  ) {
    return this.coreEngineCRUDUsecase.execute({
      url: `/${params[0]}`,
      placeholderDataSouce: {
        requestBody: {},
        queryParams,
        pathParams: {},
      },
      applicationId,
      method: 'DELETE',
    });
  }

  @Patch('api/*')
  performPatchCrud(
    @Param() params: any,
    @Body() reqBody: any,
    @Query() queryParams: any,
    @CoreEngineApplicationId() applicationId: ObjectId
  ) {
    return this.coreEngineCRUDUsecase.execute({
      url: `/${params[0]}`,
      placeholderDataSouce: {
        requestBody: reqBody,
        queryParams,
        pathParams: {},
      },
      applicationId,
      method: 'PATCH',
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
            req.applicationId,
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
    @CoreEngineApplicationId() applicationId: string,
    @Query('path') path: string
  ) {
    return this.coreEngineFetchFilesUsecase.execute({
      path,
      applicationId,
    });
  }

  // @Delete('application')
  // async deleteApplication(@CoreEngineApplicationId() applicationId: string) {
  //   return this.deleteApplicationUsecase.execute({
  //     applicationId: new ObjectId(applicationId),
  //   });
  // }
}
