import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { RepositoryModule } from '../repository/repository.module';
import { ConfigModule } from "@nestjs/config";
import { validateEnvVariables } from '../../config/env.validator';
import { appConfig } from '../../config/app.config';
import { dbConfig } from '../../config/db.config';
import { NotificationsModule } from '../notification/notification.module';
import { emailconfig } from '../../config/email.config';

@Module({
  imports: [
    AccountsModule, 
    RepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvVariables,
      load: [appConfig, dbConfig, emailconfig]
    }),
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
