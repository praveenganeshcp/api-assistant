import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      return new ObjectId(value);
    } catch (err) {
      throw new BadRequestException('Invalid unique ID sent in request params');
    }
  }
}
