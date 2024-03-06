import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './config/env.validator';
import { appConfig } from './config/app.config';
import { dbConfig } from './config/db.config';
import { emailconfig } from './config/email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvVariables,
      cache: false,
      load: [appConfig, dbConfig, emailconfig],
    }),
  ],
})
export class ConfigBeModule {}