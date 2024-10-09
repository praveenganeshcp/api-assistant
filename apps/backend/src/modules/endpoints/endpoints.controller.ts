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
} from '@api-assistant/application-endpoints-be';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import { ObjectId } from 'mongodb';

@Controller('/applications/:applicationId/endpoints')
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
    @Param('applicationId') applicationId: string
  ) {
    return this.createEndpointUsecase.execute({
      name: payload.name,
      description: payload.description,
      url: payload.url,
      crud: payload.crud.map((crud) => ({
        collectionName: crud.collectionName,
        operation: crud.operation,
        payload: crud.payload,
      })),
      response: payload.response,
      createdBy: currentUser._id,
      applicationId: new ObjectId(applicationId),
      validations: payload.validations,
      method: payload.method,
      isAuthenticated: payload.isAuthenticated,
    });
  }

  @Get('')
  getAllEndpointsMinimalInfo(
    @AuthUser() currentUser: UserDetails,
    @Param('applicationId') applicationId: string
  ) {
    return this.getAllEndpointsMinimalInfoUsecase.execute({
      userId: currentUser._id,
      applicationId: new ObjectId(applicationId),
    });
  }

  @Get(':endpointId')
  getEndpointById(
    @AuthUser() currentUser: UserDetails,
    @Param('applicationId') applicationId: string,
    @Param('endpointId') endpointId: string
  ) {
    return this.getEndpointByIdUsecase.execute({
      id: new ObjectId(endpointId),
      applicationId: new ObjectId(applicationId),
      userId: currentUser._id,
    });
  }

  @Patch(':endpointId')
  editEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Param('applicationId') applicationId: string,
    @Param('endpointId') endpointId: string,
    @Body() patchEndpointBody: PatchEndpointCRUDDto
  ) {
    return this.updateEndpointUsecase.execute({
      details: patchEndpointBody,
      userId: currentUser._id,
      applicationId: new ObjectId(applicationId),
      id: new ObjectId(endpointId),
    });
  }

  @Delete(':endpointId')
  deleteEndpoint(
    @AuthUser() currentUser: UserDetails,
    @Param('applicationId') applicationId: string,
    @Param('endpointId') endpointId: string
  ) {
    return this.deleteEndpointUsecase.execute({
      createdBy: currentUser._id,
      id: new ObjectId(endpointId),
      applicationId: new ObjectId(applicationId),
    });
  }
}
