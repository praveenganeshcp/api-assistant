import { Usecase } from "@api-assistant/commons-be";
import { Inject, Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { FetchAllEndpointsByApplicationIdUsecase } from "../api-builder-usecases/fetch-all-endpoints-by-app-id.usecase";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class UpdateRouteHandlersUsecase implements Usecase<ObjectId, void> {

    constructor(
        private fetchAllEndpointsByAppIdUsecase: FetchAllEndpointsByApplicationIdUsecase,
        private cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {}

    async execute(applicationId: ObjectId): Promise<void> {
        const applicationsRootPath = this.crudApplicationConfig.ROOTDIR;
        const routesRootPath = `${applicationsRootPath}/${applicationId.toString()}/src/routes.ts`;
        const allEndpoints = await this.fetchAllEndpointsByAppIdUsecase.execute(applicationId);
        const endpointsUsingCloudCode = allEndpoints.filter(endpoint => endpoint.useCloudCode);
        const endpointsImportPaths = endpointsUsingCloudCode.map(endpoint => {
            const moduleName = endpoint.requestHandler.split('.')[0];
            return `
            import ${moduleName} from './routes/${moduleName}';
            router.${endpoint.method.toLowerCase()}('${endpoint.url}', ${moduleName});
            `
        })
        const baseCode = `
        import { Router } from "express";
        export const router = Router();

        ${endpointsImportPaths.join('\n')}
        `
        await writeFile(routesRootPath, baseCode, 'utf-8');
        this.cloudCodeProcessManagerService.restartApplication(applicationId);
    }
}