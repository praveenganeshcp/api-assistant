import { BadRequestException, Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ApplicationDatabaseOperation } from "../application-details.dto";
import { CRUDAppAPIAdapter } from "@api-assistant/commons-be";
import { FetchApplicationByIdUsecase } from "@api-assistant/applications-be";

@Controller("applications/:applicationId")
export class ApplicationDetailsController {

  constructor(
    private readonly appAPIAdapter: CRUDAppAPIAdapter,
    private readonly getApplicationByIdUsecase: FetchApplicationByIdUsecase
  ) {}

  @Get("collections")
  async fetchDbCollections(@Param("applicationId") applicationId: string) {
    const application = await this.getApplicationByIdUsecase.execute(new ObjectId(applicationId));
    if(!application) {
      throw new BadRequestException("Invalid app ID");
    }
    const result = await this.appAPIAdapter.get(application.port, "/api/v6/database/collections");
    console.log(result);
    return result;
  }

  @Post("query")
  async performDBAction(
    @Body() payload: ApplicationDatabaseOperation,
    @Param("applicationId") applicationId: string
  ) {
    const application = await this.getApplicationByIdUsecase.execute(new ObjectId(applicationId));
    if(!application) {
      throw new BadRequestException("Invalid app ID");
    }
    const result = await this.appAPIAdapter.post(application.port, "/api/v6/database/query", payload);
    console.log(result);
    return result;
  }
}
