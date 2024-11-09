import { Controller, Logger } from "@nestjs/common";

@Controller("core-engine")
export class CoreEngineController {
  private logger = new Logger(CoreEngineController.name);
}
