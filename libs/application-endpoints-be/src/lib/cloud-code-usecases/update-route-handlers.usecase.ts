import { CORE_ENGINE_PREFIX, Usecase } from "@api-assistant/commons-be";
import { Inject, Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { FetchAllEndpointsByApplicationIdUsecase } from "../api-builder-usecases/fetch-all-endpoints-by-app-id.usecase";
import { crudAppConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";
import { Endpoint } from "../entities";

@Injectable()
export class UpdateRouteHandlersUsecase implements Usecase<ObjectId, void> {

    constructor(
        private fetchAllEndpointsByAppIdUsecase: FetchAllEndpointsByApplicationIdUsecase,
        private cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {}

    async execute(applicationId: ObjectId): Promise<void> {
        const applicationsRootPath = this.crudApplicationConfig.ROOTDIR;
        const allEndpoints = await this.fetchAllEndpointsByAppIdUsecase.execute(applicationId);

        const routesScriptPath = `${applicationsRootPath}/${applicationId.toString()}/src/routes.ts`;
        const endpointsUsingCloudCode = allEndpoints.filter(endpoint => endpoint.useCloudCode);
        await this.updateCloudCodeHandlers(endpointsUsingCloudCode, routesScriptPath, 'routes');

        const apiBuilderRoutesScriptPath = `${applicationsRootPath}/${applicationId.toString()}/src/api-builder-routes.ts`;
        const endpointsWithoutUsingCloudCode = allEndpoints.filter(endpoint => 
            !endpoint.useCloudCode && (
                endpoint.url  !== "/signup" &&
                endpoint.url  !== "/login" &&
                endpoint.url  !== "/logout"
            )
        );
        await this.updateCloudCodeHandlers(endpointsWithoutUsingCloudCode, apiBuilderRoutesScriptPath, 'api-builder-routes');

        await this.cloudCodeProcessManagerService.restartApplication(applicationId);
    }

    private async updateCloudCodeHandlers(endpoints: Endpoint[], routesScriptPath: string, routesRootPath: string) {
        const endpointsImportPaths = endpoints.map(endpoint => {
            const moduleName = endpoint.useCloudCode ? endpoint.requestHandler.split('.')[0] : endpoint.name.split(' ').join('');
            return `
            import ${moduleName} from './${routesRootPath}/${moduleName}';
            router.${endpoint.method.toLowerCase()}('${CORE_ENGINE_PREFIX}${endpoint.url}', ${moduleName});
            `
        })
        const baseCode = `
        import { Router } from "express";
        export const router = Router();

        ${endpointsImportPaths.join('\n')}
        `
        await writeFile(routesScriptPath, baseCode, 'utf-8');
    }
}