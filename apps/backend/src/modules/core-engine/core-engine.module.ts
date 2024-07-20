import { Module } from '@nestjs/common';
import { CoreEngineController } from './controllers/core-engine.controller';
import { CrudEngineBeModule } from '@api-assistant/crud-engine-be';
import { CoreEngineAuthenticationMiddleware } from './middleware/core-engine-auth.middleware';
import { ApplicationsBeModule } from '@api-assistant/applications-be';

@Module({
  controllers: [CoreEngineController],
  imports: [CrudEngineBeModule, ApplicationsBeModule],
  providers: [CoreEngineAuthenticationMiddleware],
  exports: [CoreEngineAuthenticationMiddleware],
})
export class CoreEngineModule {}
