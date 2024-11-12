import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import {
  CreateEndpointUsecase,
  CreateEndpointUsecaseInput,
} from "./create-endpoint.usecase";
import { Injectable } from "@nestjs/common";
import { ALLOWED_DB_OPERATIONS } from "@api-assistant/application-endpoints-core";

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
      skipCloudCodeUpdate: true,
      createdBy: userId,
      applicationId,
      name: "Signup",
      description: "Endpoint to create user accounts",
      useCloudCode: false,
      requestHandler: "",
      url: "/signup",
      isAuthenticated: false,
      method: "POST",
      validations: {},
      crud: [
        {
          collectionName: "users",
          operation: ALLOWED_DB_OPERATIONS.insertOne,
          payload: {
            username: "${Request.body.username}",
            emailId: "${Request.body.emailId}",
            password: "${Request.body.password}",
          },
        },
        {
          collectionName: "users",
          operation: ALLOWED_DB_OPERATIONS.findOne,
          payload: {
            filter: {
              _id: "${Steps.0.insertedId}",
            },
            options: {},
          },
        },
      ],
      response: {
        message: "User account created successfully",
        user: {
          id: "${Steps.1._id}",
          username: "${Steps.1.username}",
          emailId: "${Steps.1.emailId}",
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
      skipCloudCodeUpdate: true,
      createdBy: userId,
      applicationId,
      name: "Login",
      description: "Endpoint to login user accounts",
      url: "/login",
      method: "POST",
      isAuthenticated: false,
      useCloudCode: false,
      requestHandler: "",
      crud: [
        {
          collectionName: "users",
          operation: ALLOWED_DB_OPERATIONS.findOne,
          payload: {
            filter: {
              emailId: "${Request.body.emailId}",
            },
            options: {},
          },
        },
      ],
      validations: {},
      response: {
        message: "User loggedin successfully",
        user: "${Steps.0}",
      },
    };
    return input;
  }

  private buildLogoutEndpoint(
    applicationId: ObjectId,
    userId: ObjectId
  ): CreateEndpointUsecaseInput {
    const input: CreateEndpointUsecaseInput = {
      skipCloudCodeUpdate: true,
      createdBy: userId,
      useCloudCode: false,
      requestHandler: "",
      applicationId,
      isAuthenticated: false,
      name: "Logout",
      description: "Endpoint to logout user accounts",
      url: "/logout",
      crud: [],
      method: "POST",
      response: {},
      validations: {},
    };
    return input;
  }
}
