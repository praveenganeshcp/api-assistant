import { CanBeNull, Usecase } from '@api-assistant/commons-be';
import { FindActionPayload } from '@api-assistant/crud-engine-core';
import { Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

interface CoreEngineFindAllActionUsecaseInput {
  query: FindActionPayload;
  db: Db;
  collectionName: string;
}

@Injectable()
export class CoreEngineFindAllActionUsecase
  implements Usecase<CoreEngineFindAllActionUsecaseInput, Object[]>
{
  execute(input: CoreEngineFindAllActionUsecaseInput): Promise<Object[]> {
    return input.db
      .collection(input.collectionName)
      .find(input.query.filter, input.query.options)
      .toArray();
  }
}
