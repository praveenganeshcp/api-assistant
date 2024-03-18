import { Controller, Post, Param, Get, Body, Delete } from '@nestjs/common';
import { CreateProjectDTO } from '../projects.dto';
import { AuthUser, ObjectIdPipe } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import { UserDetails } from '@api-assistant/auth-be';
import {
  CreateProjectUsecase,
  FetchProjectByIdUsecase,
  FetchProjectsByUserIdUsecase,
} from '@api-assistant/projects-be';

@Controller('projects')
export class ProjectsController {
  constructor(
    private createProjectUsecase: CreateProjectUsecase,
    private fetchProjectsByUserIdUsecase: FetchProjectsByUserIdUsecase,
    private fetchProjectByIdUsecase: FetchProjectByIdUsecase,
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

  @Get(':projectId')
  async fetchProjectById(
    @AuthUser() user: UserDetails,
    @Param('projectId', ObjectIdPipe) projectId: ObjectId
  ) {
    const projectDetail = await this.fetchProjectByIdUsecase.execute({
      userId: user._id,
      projectId: projectId,
    });
    return { projectDetail: projectDetail ? projectDetail : null };
  }
}
