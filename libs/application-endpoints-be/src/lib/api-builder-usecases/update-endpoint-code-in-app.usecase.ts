import { Usecase } from "@api-assistant/commons-be";
import { Endpoint } from "../entities";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";
import { writeFile } from "fs/promises";
import { Inject, Injectable, Logger } from "@nestjs/common";

@Injectable()
export class UpdateEndpointCodeInAppUsecase implements Usecase<Endpoint, void> {

    private readonly logger = new Logger(UpdateEndpointCodeInAppUsecase.name);
    
    constructor(
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {}

    async execute(endpoint: Endpoint): Promise<void> {
        const applicationPath = `${this.crudApplicationConfig.ROOTDIR}/${endpoint.applicationId.toString()}`;
        const scriptPath = `${applicationPath}/src/api-builder-routes/${endpoint.name}.ts`;
        await writeFile(scriptPath, `${this.getCode(endpoint)}`, 'utf-8');
        this.logger.log('code updated')
    }

      private getCode(endpoint: Endpoint): string {
        return `
        import { CoreEngineCRUDUsecase } from "@core-engine/usecases/crud-engine.usecase";
        import { Request, Response } from "express";
        import Container from "typedi";
    
        export default async function handleRequest(req: Request, res: Response) {
          const coreEngineCRUDUSecase = Container.get(CoreEngineCRUDUsecase);
          const response = await coreEngineCRUDUSecase.execute({
            handlerLogic: {
              crud: ${JSON.stringify(endpoint.crud)},
              response: ${JSON.stringify(endpoint.response)},
              validations: ${JSON.stringify(endpoint.validations)}
            },
            placeholderDataSouce: {
              authUser: null,
              requestBody: req.body,
              pathParams: req.params,
              queryParams: req.query
            }
          })
          res.json(response);
        }
    
        `
      }
}