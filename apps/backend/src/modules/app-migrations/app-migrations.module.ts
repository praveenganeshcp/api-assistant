import { Module } from '@nestjs/common';
import { ApplicationMigrationsController } from './app-migrations.controller';
import { DbMigrationsBeModule } from '@api-assistant/application-db-migrations-be';

@Module({
  imports: [DbMigrationsBeModule],
  controllers: [ApplicationMigrationsController],
})
export class ApplicationMigrationsModule {}
