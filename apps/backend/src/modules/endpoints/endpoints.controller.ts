import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EndpointCRUDDto } from './endpoints.dto';
import {
  CreateEndpointUsecase,
  GetAllEndpointsMinimalInfoUsecase,
  GetEndpointByIdUsecase,
} from '@api-assistant/endpoints-be';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import { ObjectId } from 'mongodb';

@Controller('/projects/:projectId/endpoints')
export class EndpointsController {
  constructor(
    private readonly createEndpointUsecase: CreateEndpointUsecase,
    private readonly getAllEndpointsMinimalInfoUsecase: GetAllEndpointsMinimalInfoUsecase,
    private readonly getEndpointByIdUsecase: GetEndpointByIdUsecase
  ) {}

  @Post('')
  createEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Body() payload: EndpointCRUDDto,
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
}
