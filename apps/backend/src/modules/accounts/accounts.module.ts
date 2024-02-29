import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import {
  AccountsBeModule,
  AuthenticationMiddleware,
} from '@api-assistant/auth-be';

@Module({
  controllers: [AccountsController],
  imports: [AccountsBeModule],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: '/accounts/profile',
      method: RequestMethod.GET,
    });
  }
}
