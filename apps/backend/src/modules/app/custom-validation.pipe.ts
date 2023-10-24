import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const errorResponse = error.getResponse() as { message: string[] };
        if (
          Array.isArray(errorResponse.message) &&
          errorResponse.message.length > 0
        ) {
          throw new BadRequestException(errorResponse.message[0]);
        }
      }
      throw error;
    }
  }
}
