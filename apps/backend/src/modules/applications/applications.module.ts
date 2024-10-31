import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import {
  AccountsBeModule,
  AuthenticationMiddleware,
} from '@api-assistant/auth-be';
import { ApplicationsBeModule } from '@api-assistant/applications-be';
import { ApplicationsController } from './application.controller';
import { ApplicationProcessManagerController } from './application-process.controller';

@Module({
  controllers: [
    ApplicationProcessManagerController,
    ApplicationsController
  ],
  imports: [AccountsBeModule, ApplicationsBeModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ApplicationsController);
  }
}
