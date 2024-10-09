import { Usecase } from '@api-assistant/commons-be';
import { Injectable, Logger } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CoreEngineJWTService } from '../services/core-engine-jwt.service';
import { CRUDActionExecutorUsecase } from './crud-action-executor.usecase';
import { ALLOWED_DB_OPERATIONS } from '@api-assistant/applications-crud-engine-core';

interface AuthenticatedUser {
  id: ObjectId;
  emailId: string;
  username: string;
}

interface AuthenticateAppUserUsecaseInput {
  token: string;
  db: Db;
}

@Injectable()
export class AuthenticateAppUserUsecase
  implements Usecase<AuthenticateAppUserUsecaseInput, AuthenticatedUser>
{
  private readonly logger = new Logger(AuthenticateAppUserUsecase.name);

  constructor(
    private readonly jwtService: CoreEngineJWTService,
    private readonly crudActionExecutor: CRUDActionExecutorUsecase
  ) {}

  async execute(
    data: AuthenticateAppUserUsecaseInput
  ): Promise<AuthenticatedUser> {
    this.logger.log('authenticating user...');
    const { token, db } = data;
    const userId = this.jwtService.validate(token);
    this.logger.log('authenticated user id ' + userId.toString());
    const authUser: any = await this.crudActionExecutor.execute({
      db,
      actionDef: {
        operation: ALLOWED_DB_OPERATIONS.findOne,
        collectionName: 'users',
        payload: {
          filter: {
            _id: userId,
          },
          options: {},
        },
      },
    });
    this.logger.log('found auth user record');
    return {
      id: authUser._id,
      emailId: authUser.emailId,
      username: authUser.username,
    };
  }
}
