import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { RepositoryModule } from '../repository/repository.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from '../../config/env.validator';
import { appConfig } from '../../config/app.config';
import { dbConfig } from '../../config/db.config';
import { NotificationsModule } from '../notification/notification.module';
import { emailconfig } from '../../config/email.config';
import { ProjectModule } from '../projects/projects.module';
import { CoreEngineModule } from '../core-engine/core-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvVariables,
      cache: false,
      load: [appConfig, dbConfig, emailconfig],
    }),
    AccountsModule,
    RepositoryModule,
    NotificationsModule,
    ProjectModule,
    CoreEngineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
