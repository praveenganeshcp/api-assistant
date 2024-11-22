import { Module } from '@nestjs/common';
import { ApplicationMigrationsController } from './app-migrations.controller';
import { DbMigrationsBeModule } from '@api-assistant/application-db-migrations-be';
import { ApplicationsBeModule } from '@api-assistant/applications-be';

@Module({
  imports: [DbMigrationsBeModule, ApplicationsBeModule],
  controllers: [ApplicationMigrationsController],
})
export class ApplicationMigrationsModule {}
