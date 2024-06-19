import { Repository } from '@api-assistant/repository';
import { Endpoint } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EndpointsRepository extends Repository<Endpoint> {
  constructor() {
    super('endpoints');
  }
}
