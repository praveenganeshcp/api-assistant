import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AbstractRepository } from '@api-assistant/repository';

@Injectable()
export class AccountsRepository extends AbstractRepository<User> {
  constructor() {
    super('users');
  }
}
