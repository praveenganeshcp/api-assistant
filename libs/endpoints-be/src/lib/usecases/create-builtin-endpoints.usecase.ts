import { Usecase } from '@api-assistant/commons-be';
import { ObjectId } from 'mongodb';
import {
  CreateEndpointUsecase,
  CreateEndpointUsecaseInput,
} from './create-endpoint.usecase';
import { ALLOWED_DB_OPERATIONS_IN_ENDPOINT } from '../models';
import { Injectable } from '@nestjs/common';

interface CreateAllBuiltinEndpointsUsecaseInput {
  userId: ObjectId;
  applicationId: ObjectId;
}

@Injectable()
export class CreateAllBuiltinEndpointsUsecase
  implements Usecase<CreateAllBuiltinEndpointsUsecaseInput, void>
{
  constructor(private readonly createEndpointUsecase: CreateEndpointUsecase) {}

  async execute(data: CreateAllBuiltinEndpointsUsecaseInput): Promise<void> {
    const { userId, applicationId } = data;
    await this.createEndpointUsecase.execute(
      this.buildCreateAccountEndpoint(applicationId, userId)
    );
    await this.createEndpointUsecase.execute(
      this.buildLoginEndpoint(applicationId, userId)
    );
    await this.createEndpointUsecase.execute(
      this.buildLogoutEndpoint(applicationId, userId)
    );
    return;
  }

  private buildCreateAccountEndpoint(
    applicationId: ObjectId,
    userId: ObjectId
  ): CreateEndpointUsecaseInput {
    const input: CreateEndpointUsecaseInput = {
      createdBy: userId,
      applicationId,
      name: 'Signup',
      description: 'Endpoint to create user accounts',
      url: '/signup',
      crud: [
        {
          collectionName: 'users',
          action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne,
          payload: {
            username: '${Request.body.username}',
            emailId: '${Request.body.emailId}',
            password: '${Request.body.password}',
          },
        },
        {
          collectionName: 'users',
          action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne,
          payload: {
            filter: {
              _id: '${Steps.0.insertedId}',
            },
            options: {},
          },
        },
      ],
      response: {
        message: 'User account created successfully',
        user: {
          id: '${Steps.1._id}',
          username: '${Steps.1.username}',
          emailId: '${Steps.1.emailId}',
        },
      },
    };
    return input;
  }

  private buildLoginEndpoint(
    applicationId: ObjectId,
    userId: ObjectId
  ): CreateEndpointUsecaseInput {
    const input: CreateEndpointUsecaseInput = {
      createdBy: userId,
      applicationId,
      name: 'Login',
      description: 'Endpoint to login user accounts',
      url: '/login',
      crud: [
        {
          collectionName: 'users',
          action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne,
          payload: {
            emailId: '${Request.body.emailId}',
            password: '${Request.body.password}',
          },
        },
      ],
      response: {
        message: 'User loggedin successfully',
        user: {
          id: '${Steps.0._id}',
          username: '${Steps.0.username}',
          emailId: '${Steps.0.emailId}',
        },
      },
    };
    return input;
  }

  private buildLogoutEndpoint(
    applicationId: ObjectId,
    userId: ObjectId
  ): CreateEndpointUsecaseInput {
    const input: CreateEndpointUsecaseInput = {
      createdBy: userId,
      applicationId,
      name: 'Logout',
      description: 'Endpoint to logout user accounts',
      url: '/logout',
      crud: [],
      response: {},
    };
    return input;
  }
}
