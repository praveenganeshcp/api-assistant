import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from '../accounts/accounts.module';
import { CoreEngineModule } from '../core-engine/core-engine.module';
import { ConfigBeModule } from '@api-assistant/configuration-be';
import { RepositoryModule } from '@api-assistant/repository';
import { NotificationsModule } from '@api-assistant/notifications-be';
import { EndpointsModule } from '../endpoints/endpoints.module';
import { ApplicationModule } from '../applications/applications.module';
import { ApplicationMigrationsModule } from '../app-migrations/app-migrations.module';
import { CloudCodeModule } from '../cloud-code/cloud-code.module';

@Module({
  imports: [
    ConfigBeModule,
    AccountsModule,
    RepositoryModule,
    NotificationsModule,
    ApplicationModule,
    CoreEngineModule,
    EndpointsModule,
    ApplicationMigrationsModule,
    CloudCodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
