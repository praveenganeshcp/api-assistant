import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const httpRequest = context.switchToHttp().getRequest();
    return httpRequest['authUser'];
  }
);

export const CoreEngineApplicationId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const httpRequest: any = context.switchToHttp().getRequest();
    return httpRequest['applicationId'];
  }
);
