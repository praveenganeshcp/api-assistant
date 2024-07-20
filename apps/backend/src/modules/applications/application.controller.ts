import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateApplicationDTO } from './applications.dto';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import {
  CreateApplicationUsecase,
  FetchApplicationsByUserIdUsecase,
} from '@api-assistant/applications-be';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly createApplicationUsecase: CreateApplicationUsecase,
    private readonly fetchApplicationsByUserIdUsecase: FetchApplicationsByUserIdUsecase
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
}
