import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';

import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './modules/app/http-exception.filter';
import { CustomValidationPipe } from './modules/app/custom-validation.pipe';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { appConfig } from '@api-assistant/configuration-be';
import { RestartAllApplicationsUsecase } from '@api-assistant/applications-be';
import { GLOBAL_PREFIX } from '@api-assistant/commons-be';

async function bootstrap() {
  // bootstrap app module
  const app = await NestFactory.create(AppModule);

  // set app port
  const applicationConfig: ConfigType<typeof appConfig> = app.get(
    appConfig.KEY
  );

  // cookie parser middleware
  app.use(cookieParser());

  app.enableCors({
    origin: [applicationConfig.FE_HOST_ADDRESS],
    credentials: true,
  });

  // set global prefix
  app.setGlobalPrefix(GLOBAL_PREFIX);

  const restartAllAppsUsecase = app.get(RestartAllApplicationsUsecase);

  // global pipes
  app.useGlobalPipes(new CustomValidationPipe());

  // global filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // class-validator DI settings
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(applicationConfig.PORT);

  Logger.log(
    `🚀 Application is running on: http://localhost:${applicationConfig.PORT}${GLOBAL_PREFIX}`
  );

  setTimeout(() => {
    restartAllAppsUsecase.execute();
  }, 1000);
}

bootstrap();
