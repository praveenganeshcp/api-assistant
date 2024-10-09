import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateApplicationDTO } from './applications.dto';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import {
  CreateApplicationUsecase,
  FetchApplicationByIdUsecase,
  FetchApplicationsByUserIdUsecase,
} from '@api-assistant/applications-be';
import { ObjectId } from 'mongodb';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly createApplicationUsecase: CreateApplicationUsecase,
    private readonly fetchApplicationsByUserIdUsecase: FetchApplicationsByUserIdUsecase,
    private readonly fetchApplicationIdUsecase: FetchApplicationByIdUsecase
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

  @Get(':appliationId')
  async fetchApplicationsById(@Param('appliationId') applicationId: string) {
    const applications = await this.fetchApplicationIdUsecase.execute(
      new ObjectId(applicationId)
    );
    return applications;
  }
}
