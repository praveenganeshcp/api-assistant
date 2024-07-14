import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEndpointCRUDDto, PatchEndpointCRUDDto } from './endpoints.dto';
import {
  CreateEndpointUsecase,
  DeleteEndpointsUsecase,
  GetAllEndpointsMinimalInfoUsecase,
  GetEndpointByIdUsecase,
  UpdateEndpointUsecase,
} from '@api-assistant/endpoints-be';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import { ObjectId } from 'mongodb';

@Controller('/projects/:projectId/endpoints')
export class EndpointsController {
  constructor(
    private readonly createEndpointUsecase: CreateEndpointUsecase,
    private readonly getAllEndpointsMinimalInfoUsecase: GetAllEndpointsMinimalInfoUsecase,
    private readonly getEndpointByIdUsecase: GetEndpointByIdUsecase,
    private readonly updateEndpointUsecase: UpdateEndpointUsecase,
    private readonly deleteEndpointUsecase: DeleteEndpointsUsecase
  ) {}

  @Post('')
  createEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Body() payload: CreateEndpointCRUDDto,
    @Param('projectId') projectId: string
  ) {
    return this.createEndpointUsecase.execute({
      name: payload.name,
      description: payload.description,
      url: payload.url,
      crud: payload.crud.map((crud) => ({
        collectionName: crud.collectionName,
        action: crud.action,
        payload: crud.payload,
      })),
      response: payload.response,
      createdBy: currentUser._id,
      projectId: new ObjectId(projectId),
    });
  }

  @Get('')
  getAllEndpointsMinimalInfo(
    @AuthUser() currentUser: UserDetails,
    @Param('projectId') projectId: string
  ) {
    return this.getAllEndpointsMinimalInfoUsecase.execute({
      userId: currentUser._id,
      projectId: new ObjectId(projectId),
    });
  }

  @Get(':endpointId')
  getEndpointById(
    @AuthUser() currentUser: UserDetails,
    @Param('projectId') projectId: string,
    @Param('endpointId') endpointId: string
  ) {
    return this.getEndpointByIdUsecase.execute({
      id: new ObjectId(endpointId),
      projectId: new ObjectId(projectId),
      userId: currentUser._id,
    });
  }

  @Patch(':endpointId')
  editEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Param('projectId') projectId: string,
    @Param('endpointId') endpointId: string,
    @Body() patchEndpointBody: PatchEndpointCRUDDto
  ) {
    return this.updateEndpointUsecase.execute({
      details: patchEndpointBody,
      userId: currentUser._id,
      projectId: new ObjectId(projectId),
      id: new ObjectId(endpointId),
    });
  }

  @Delete(':endpointId')
  deleteEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Param('projectId') projectId: string,
    @Param('endpointId') endpointId: string
  ) {
    return this.deleteEndpointUsecase.execute({
      createdBy: currentUser._id,
      id: new ObjectId(endpointId),
      projectId: new ObjectId(projectId),
    });
  }
}
