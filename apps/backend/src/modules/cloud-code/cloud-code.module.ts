import { ApplicationCloudCodeBeModule } from "@api-assistant/application-cloud-code-be";
import { Module } from "@nestjs/common";
import { CloudCodeController } from "./cloud-code.controller";

@Module({
    imports: [ApplicationCloudCodeBeModule],
    controllers: [CloudCodeController]
})
export class CloudCodeModule {}