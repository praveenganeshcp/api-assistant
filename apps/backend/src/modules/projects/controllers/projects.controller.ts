import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateProjectDTO } from '../projects.dto';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import {
  CreateProjectUsecase,
  FetchProjectsByUserIdUsecase,
} from '@api-assistant/projects-be';

@Controller('projects')
export class ProjectsController {
  constructor(
    private createProjectUsecase: CreateProjectUsecase,
    private fetchProjectsByUserIdUsecase: FetchProjectsByUserIdUsecase,
  ) {}

  @Post()
  createProject(
    @Body() createProjectDTO: CreateProjectDTO,
    @AuthUser() user: UserDetails
  ) {
    return this.createProjectUsecase.execute({
      name: createProjectDTO.name,
      createdBy: user._id,
    });
  }

  @Get()
  async fetchProjectsByUserId(@AuthUser() user: UserDetails) {
    const projects = await this.fetchProjectsByUserIdUsecase.execute(user._id);
    return projects;
  }

}
