import { crudAppConfig } from "@api-assistant/configuration-be";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { ObjectId } from "mongodb";
const pm2 = require('pm2');

@Injectable()
export class CloudCodeProcessManagerService {

    private readonly logger = new Logger(CloudCodeProcessManagerService.name);

    constructor(
        @Inject(crudAppConfig.KEY) private readonly crudApplicationConfig: ConfigType<typeof crudAppConfig>,
    ) {
        this.logger.log('connecting to pm2 daemon')
        pm2.connect((err: any) => {
            if(err) {
                console.error(err)
                throw new Error(err.message);
            }
        })
    }

    startApplication(applicationId: ObjectId): void {
        const scriptPath = `${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}/dist/index.js`;
        this.logger.log('starting service for application '+applicationId.toString())
        this.logger.log('starting script at '+scriptPath)
        pm2.start({
            script: scriptPath,
            name: applicationId.toString(),
        }, (error: any) => {
            if(error) {
                console.error(error)
                this.logger.error('error in starting process');
            }
        })
    }

    restartApplication(applicationId: ObjectId) {
        this.logger.log('restarting application id '+applicationId.toString());
        pm2.restart(applicationId.toString(), (error: any) => {
            if(error) {
                console.error('error in restarting the application');
            }
        })
    }

    stopApplication(applicationId: ObjectId) {
        this.logger.log('stopping application id '+applicationId.toString());
        pm2.stop(applicationId.toString(), (error: any) => {
            if(error) {
                console.error('error in stopping the application');
            }
        })
    }

    getApplicationStatus(applicationId: ObjectId) {
        return new Promise((resolve, reject) => {
            pm2.describe(applicationId.toString(), (error: any, data: any) => {
                if(error) {
                    reject(error)
                }
                if(Array.isArray(data) && data.length === 1) {
                    resolve({
                        status: data[0].pm2_env.status,
                        restartCount: data[0].pm2_env.restart_time,
                    })
                }
            })
        })
    }

    getAllApplicationStatus() {
        return new Promise((resolve, reject) => {
            pm2.list((error: any, data: any) => {
                if(error) {
                    reject(error)
                }
                resolve(data)
            })
        })
    }
}