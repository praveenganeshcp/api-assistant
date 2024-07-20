import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import {
  AccountsBeModule,
  AuthenticationMiddleware,
} from '@api-assistant/auth-be';
import { ApplicationsBeModule } from '@api-assistant/applications-be';
import { ApplicationsController } from './application.controller';

@Module({
  controllers: [ApplicationsController],
  imports: [AccountsBeModule, ApplicationsBeModule],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ApplicationsController);
  }
}
