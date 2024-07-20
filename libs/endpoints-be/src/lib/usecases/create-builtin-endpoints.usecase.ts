import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import { CreateEndpointUsecase, CreateEndpointUsecaseInput } from "./create-endpoint.usecase";
import { ALLOWED_DB_OPERATIONS_IN_ENDPOINT } from "../models";
import { Injectable } from "@nestjs/common";

interface CreateAllBuiltinEndpointsUsecaseInput {
    userId: ObjectId;
    projectId: ObjectId
}

@Injectable()
export class CreateAllBuiltinEndpointsUsecase implements Usecase<CreateAllBuiltinEndpointsUsecaseInput, void> {

    constructor(
        private readonly createEndpointUsecase: CreateEndpointUsecase
    ) {}

    async execute(data: CreateAllBuiltinEndpointsUsecaseInput): Promise<void> {
        const { userId, projectId } = data;
        await this.createEndpointUsecase.execute(this.buildCreateAccountEndpoint(projectId, userId))
        await this.createEndpointUsecase.execute(this.buildLoginEndpoint(projectId, userId))
        await this.createEndpointUsecase.execute(this.buildLogoutEndpoint(projectId, userId))
        return;
    }

    private buildCreateAccountEndpoint(projectId: ObjectId, userId: ObjectId): CreateEndpointUsecaseInput {
        const input: CreateEndpointUsecaseInput = {
          createdBy: userId,
          projectId,
          name: "Signup",
          description: "Endpoint to create user accounts",
          url: "/signup",
          crud: [
            {
              collectionName: "users",
              action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.insertOne,
              payload: {
                username: "${Request.body.username}",
                emailId: "${Request.body.emailId}",
                password: "${Request.body.password}",
              }
            },
            {
              collectionName: "users",
              action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne,
              payload: {
                filter: {
                  _id: "${Steps.0.insertedId}"
                },
                options: {}
              }
            }
          ],
          response: {
            message: "User account created successfully",
            user: {
              id: "${Steps.1._id}",
              username: "${Steps.1.username}",
              emailId: "${Steps.1.emailId}",
            }
          }
        }
        return input;
      }
    
      private buildLoginEndpoint(projectId: ObjectId, userId: ObjectId): CreateEndpointUsecaseInput {
        const input: CreateEndpointUsecaseInput = {
          createdBy: userId,
          projectId,
          name: "Login",
          description: "Endpoint to login user accounts",
          url: "/login",
          crud: [
            {
              collectionName: "users",
              action: ALLOWED_DB_OPERATIONS_IN_ENDPOINT.findOne,
              payload: {
                emailId: "${Request.body.emailId}",
                password: "${Request.body.password}",
              }
            },
          ],
          response: {
            message: "User loggedin successfully",
            user: {
              id: "${Steps.0._id}",
              username: "${Steps.0.username}",
              emailId: "${Steps.0.emailId}",
            }
          }
        }
        return input;
      }
    
      private buildLogoutEndpoint(projectId: ObjectId, userId: ObjectId): CreateEndpointUsecaseInput {
        const input: CreateEndpointUsecaseInput = {
          createdBy: userId,
          projectId,
          name: "Logout",
          description: "Endpoint to logout user accounts",
          url: "/logout",
          crud: [],
          response: {}
        }
        return input;
      }
}