import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { ApplicationDatabaseOperation } from "../application-details.dto";

@Controller("applications/:applicationId")
export class ApplicationDetailsController {
  @Get("collections")
  fetchDbCollections(@Param("applicationId") applicationId: string) {}

  @Post("queries")
  performDBAction(
    @Body() payload: ApplicationDatabaseOperation,
    @Param("applicationId") applicationId: string
  ) {}
}
