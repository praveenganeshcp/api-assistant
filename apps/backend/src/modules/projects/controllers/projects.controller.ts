import { Controller, Post, Param, Get, Body, Delete } from '@nestjs/common';
import { CreateProjectDTO } from '../projects.dto';
import { AuthUser, ObjectIdPipe } from '@api-assistant/commons-be';
import { CreateProjectUsecase } from '../usecases/create-project.usecase';
import { FetchProjectsByUserIdUsecase } from '../usecases/fetch-projects-by-userid.usecase';
import { FetchProjectByIdUsecase } from '../usecases/fetch-project-by-id.usecase';
import { ObjectId } from 'mongodb';
import { UserDetails } from '@api-assistant/auth-be';
import { DeleteProjectUsecase } from '../usecases/delete-project.usecase';

@Controller('projects')
export class ProjectsController {
  constructor(
    private createProjectUsecase: CreateProjectUsecase,
    private fetchProjectsByUserIdUsecase: FetchProjectsByUserIdUsecase,
    private fetchProjectByIdUsecase: FetchProjectByIdUsecase,
    private deleteProjectUsecase: DeleteProjectUsecase
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

  @Delete(':projectId')
  async deleteProject(
    @AuthUser() user: UserDetails,
    @Param('projectId', ObjectIdPipe) projectId: ObjectId
  ) {
    return this.deleteProjectUsecase.execute({
      userId: user._id,
      projectId
    })
  }
}
