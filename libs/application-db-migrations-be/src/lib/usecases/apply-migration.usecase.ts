import { CRUDAppAPIAdapter, Usecase } from "@api-assistant/commons-be";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { FetchApplicationByIdUsecase } from "@api-assistant/applications-be";

interface ApplyMigrationUsecaseInput {
  applicationId: ObjectId;
}

@Injectable()
export class ApplyMigrationUsecase
  implements Usecase<ApplyMigrationUsecaseInput, void>
{
  private readonly logger = new Logger(ApplyMigrationUsecase.name);

  constructor(
    private readonly fetchApplicationByIdUsecase: FetchApplicationByIdUsecase,
    private readonly crudAppAPIAdapter: CRUDAppAPIAdapter
  ) {}

  async execute(data: ApplyMigrationUsecaseInput): Promise<void> {
    const application = await this.fetchApplicationByIdUsecase.execute(data.applicationId);
    if(!application) {
      throw new BadRequestException('invalid app id');
    }
    await this.crudAppAPIAdapter.patch(application.port, '/api/v6/database/migrations', {});
  }
}
