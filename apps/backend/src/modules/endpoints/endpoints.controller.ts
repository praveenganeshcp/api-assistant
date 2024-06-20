import { Body, Controller, Param, Post } from '@nestjs/common';
import { EndpointCRUDDto } from './endpoints.dto';
import { CreateEndpointUsecase } from '@api-assistant/endpoints-be';
import { AuthUser } from '@api-assistant/commons-be';
import { UserDetails } from '@api-assistant/auth-be';
import { ObjectId } from 'mongodb';

@Controller('/')
export class EndpointsController {
  constructor(private readonly createEndpointUsecase: CreateEndpointUsecase) {}

  @Post('projects/:projectId/endpoints')
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
}
