import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EndpointsController } from './endpoints.controller';
import { EndpointsBeModule } from '@api-assistant/application-endpoints-be';
import {
  AccountsBeModule,
  AuthenticationMiddleware,
} from '@api-assistant/auth-be';

@Module({
  controllers: [EndpointsController],
  imports: [EndpointsBeModule, AccountsBeModule],
})
export class EndpointsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(EndpointsController);
  }
}
