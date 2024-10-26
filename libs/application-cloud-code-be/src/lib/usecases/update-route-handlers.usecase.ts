import { FetchAllEndpointsByApplicationIdUsecase } from "@api-assistant/application-endpoints-be";
import { Usecase } from "@api-assistant/commons-be";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { ObjectId } from "mongodb";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";

@Injectable()
export class UpdateRouteHandlersUsecase implements Usecase<ObjectId, void> {

    constructor(
        @Inject(forwardRef(() =>  FetchAllEndpointsByApplicationIdUsecase))
        private fetchAllEndpointsByAppIdUsecase: FetchAllEndpointsByApplicationIdUsecase,
        private cloudCodeProcessManagerService: CloudCodeProcessManagerService
    ) {}

    async execute(applicationId: ObjectId): Promise<void> {
        const applicationsRootPath = "/Users/praveenkumar/Documents/projects/cloud_code"
        const routesRootPath = `${applicationsRootPath}/${applicationId.toString()}/routes.js`;
        const allEndpoints = await this.fetchAllEndpointsByAppIdUsecase.execute(applicationId);
        const endpointsUsingCloudCode = allEndpoints.filter(endpoint => endpoint.useCloudCode);
        const endpointsImportPaths = endpointsUsingCloudCode.map(endpoint => {
            const moduleName = endpoint.requestHandler.split('.')[0];
            return `
            const ${moduleName} = require('./routes/${moduleName}');
            router.${endpoint.method.toLowerCase()}('${endpoint.url}', ${moduleName});
            `
        })
        const baseCode = `
        const express = require('express');
        const router = express.Router();

        ${endpointsImportPaths.join('\n')}

        module.exports = router;
        
        `
        await writeFile(routesRootPath, baseCode, 'utf-8');
        this.cloudCodeProcessManagerService.restartApplication(applicationId);
    }
}