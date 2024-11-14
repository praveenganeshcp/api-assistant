import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { CreateApplicationDTO } from './applications.dto';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import {
  CreateApplicationUsecase,
  DeleteApplicationUsecase,
  FetchApplicationByIdUsecase,
  FetchApplicationLogsUsecase,
  FetchApplicationsByUserIdUsecase,
} from '@api-assistant/applications-be';
import { ObjectId } from 'mongodb';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly createApplicationUsecase: CreateApplicationUsecase,
    private readonly fetchApplicationsByUserIdUsecase: FetchApplicationsByUserIdUsecase,
    private readonly fetchApplicationIdUsecase: FetchApplicationByIdUsecase,
    private readonly deleteApplicationUsecase: DeleteApplicationUsecase,
    private readonly fetchApplicationsLogsUsecase: FetchApplicationLogsUsecase
  ) {}

  @Post()
  createApplication(
    @Body() createApplicationDTO: CreateApplicationDTO,
    @AuthUser() user: UserDetails
  ) {
    return this.createApplicationUsecase.execute({
      name: createApplicationDTO.name,
      createdBy: user._id,
    });
  }

  @Get()
  async fetchApplicationsByUserId(@AuthUser() user: UserDetails) {
    const applications = await this.fetchApplicationsByUserIdUsecase.execute(
      user._id
    );
    return applications;
  }

  @Get(':applicationId')
  async fetchApplicationsById(@Param('applicationId') applicationId: string) {
    const applications = await this.fetchApplicationIdUsecase.execute(
      new ObjectId(applicationId)
    );
    return applications;
  }

  @Get(':applicationId/logs')
  async fetchApplicationLogsById(@Param('applicationId') applicationId: string) {
    const logs = await this.fetchApplicationsLogsUsecase.execute(
      new ObjectId(applicationId)
    );
    return { logs };
  }


  @Delete(':applicationId')
  async deleteApplicationsById(@Param('applicationId') applicationId: string) {
    await this.deleteApplicationUsecase.execute(
      new ObjectId(applicationId)
    );
  }
  
}
