import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigType } from "@nestjs/config";

import { AppModule } from "./modules/app/app.module"
import { useContainer } from 'class-validator';
import { appConfig } from './config/app.config';
import cookieParser from "cookie-parser";

async function bootstrap() {
  // bootstrap app module
  const app = await NestFactory.create(AppModule);

  // cookie parser middleware
  app.use(cookieParser())

  // set global prefix
  const globalPrefix = 'api/v6';
  app.setGlobalPrefix(globalPrefix);
  
  // global pipes
  app.useGlobalPipes(new ValidationPipe())

  // class-validator DI settings
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  // set app port
  const applicationConfig: ConfigType<typeof appConfig> = app.get(appConfig.KEY)
  await app.listen(applicationConfig.PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${applicationConfig.PORT}/${globalPrefix}`
  );
}

bootstrap();
