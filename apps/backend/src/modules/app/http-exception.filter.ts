import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse: any = exception.getResponse();
    response.status(status).json({
      message:
        (typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse?.message) || 'Something went wrong!',
    });
  }
}
