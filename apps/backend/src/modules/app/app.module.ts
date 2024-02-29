import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { ProjectModule } from '../projects/projects.module';
import { CoreEngineModule } from '../core-engine/core-engine.module';
import { ConfigBeModule } from '@api-assistant/configuration-be';
import { RepositoryModule } from '@api-assistant/repository';
import { NotificationsModule } from '@api-assistant/notifications-be';

@Module({
  imports: [
    ConfigBeModule,
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
