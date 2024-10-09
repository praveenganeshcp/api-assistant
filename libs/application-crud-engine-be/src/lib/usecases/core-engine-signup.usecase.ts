import { Usecase } from '@api-assistant/commons-be';
import {
  CoreEngineCRUDUsecase,
  CoreEngineCRUDUsecaseInput,
} from './core-engine-crud.usecase';
import { Injectable, Logger } from '@nestjs/common';
import { CoreEngineJWTService } from '../services/core-engine-jwt.service';

interface CoreEngineSignupUsecaseOutput {
  user: CoreEngineSignupResponse;
  token: string;
}

interface CoreEngineSignupResponse {
  id: string;
  username: string;
  emailId: string;
}

@Injectable()
export class CoreEngineSignupUsecase
  implements Usecase<CoreEngineCRUDUsecaseInput, CoreEngineSignupUsecaseOutput>
{
  private readonly logger = new Logger(CoreEngineSignupUsecase.name);

  constructor(
    private readonly coreEngineCRUDUsecase: CoreEngineCRUDUsecase,
    private readonly coreEngineJWTService: CoreEngineJWTService
  ) {}

  async execute(
    data: CoreEngineCRUDUsecaseInput
  ): Promise<CoreEngineSignupUsecaseOutput> {
    this.logger.log('creating new user account', data);
    const response = (await this.coreEngineCRUDUsecase.execute(
      data
    )) as CoreEngineSignupResponse;
    this.logger.log('new user account created', response);
    const token = this.coreEngineJWTService.createToken(response.id);
    this.logger.log('token generated');
    return { user: response, token };
  }
}
