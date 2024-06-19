import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { Endpoint } from '../entities';
import { EndpointsRepository } from '../repositories/endpoints.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetEndpointByURLUsecase
  implements Usecase<string, CanBeNull<Endpoint>>
{
  constructor(private readonly endpointsRepo: EndpointsRepository) {}

  execute(endpointUrl: string): Promise<CanBeNull<Endpoint>> {
    return this.endpointsRepo.findOne({ url: endpointUrl });
  }
}
