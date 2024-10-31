import { Module } from "@nestjs/common";
import { CloudCodeController } from "./cloud-code.controller";
import { EndpointsBeModule } from "@api-assistant/application-endpoints-be";

@Module({
    imports: [EndpointsBeModule],
    controllers: [CloudCodeController]
})
export class CloudCodeModule {}