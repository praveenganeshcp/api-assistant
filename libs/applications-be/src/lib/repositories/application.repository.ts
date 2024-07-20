import { Injectable } from '@nestjs/common';
import { Repository } from '@api-assistant/repository';
import { Application } from '@api-assistant/application-core';

@Injectable()
export class ApplicationRepository extends Repository<Application> {
  constructor() {
    super('applications');
  }
}
