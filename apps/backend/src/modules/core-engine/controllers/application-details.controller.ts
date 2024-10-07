import {
  CoreEngineFetchCollectionsUsecase,
  CoreEngineDatabaseOperationsUsecase,
} from '@api-assistant/crud-engine-be';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ApplicationDatabaseOperation } from '../application-details.dto';

@Controller('applications/:applicationId')
export class ApplicationDetailsController {
  constructor(
    private coreEngineFetchCollectionsUsecase: CoreEngineFetchCollectionsUsecase,
    private coreEngineDatabaseOperationsUsecase: CoreEngineDatabaseOperationsUsecase
  ) {}

  @Get('collections')
  fetchDbCollections(@Param('applicationId') applicationId: string) {
    return this.coreEngineFetchCollectionsUsecase.execute(
      new ObjectId(applicationId)
    );
  }

  @Post('queries')
  performDBAction(
    @Body() payload: ApplicationDatabaseOperation,
    @Param('applicationId') applicationId: string
  ) {
    return this.coreEngineDatabaseOperationsUsecase.execute({
      applicationId: new ObjectId(applicationId),
      definition: payload,
    });
  }
}
