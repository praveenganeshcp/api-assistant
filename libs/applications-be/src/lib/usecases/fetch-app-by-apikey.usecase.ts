import { Application } from '@api-assistant/application-core';
import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { ApplicationRepository } from '../repositories/application.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FetchApplicationByAPIKeyUsecase
  implements Usecase<string, CanBeNull<Application>>
{
  constructor(private readonly applicationRepo: ApplicationRepository) {}

  execute(apiKey: string): Promise<CanBeNull<Application>> {
    return this.applicationRepo.findOne({ apiKey });
  }
}
