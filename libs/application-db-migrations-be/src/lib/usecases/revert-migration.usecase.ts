import { CRUDAppAPIAdapter, Usecase } from "@api-assistant/commons-be";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { FetchApplicationByIdUsecase } from "@api-assistant/applications-be";

interface RevertMigrationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class RevertMigrationUsecase
  implements Usecase<RevertMigrationUsecaseInput, void>
{
  private readonly logger = new Logger(RevertMigrationUsecase.name);

  constructor(
    private readonly fetchApplicationByIdUsecase: FetchApplicationByIdUsecase,
    private readonly crudAppAPIAdapter: CRUDAppAPIAdapter
  ) {}

  async execute(data: RevertMigrationUsecaseInput): Promise<void> {
    const application = await this.fetchApplicationByIdUsecase.execute(data.applicationId);
    if(!application) {
      throw new BadRequestException('invalid app id');
    }
    await this.crudAppAPIAdapter.delete(application.port, '/api/v6/database/migrations');
  }
}
