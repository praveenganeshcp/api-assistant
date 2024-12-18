import { crudAppConfig } from "@api-assistant/configuration-be";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { exec } from "child_process";
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

    async restartApps(applicationIds: ObjectId[]) {
        this.logger.log('restarting all apps')
        await Promise.all(applicationIds.map(applicationId => this.deleteApp(applicationId)));
        applicationIds.forEach(applicationId => {
            this.startApplication(applicationId);
        })
    }

    async deleteApp(applicationId: ObjectId): Promise<void> {
        this.logger.log('deleting app '+applicationId.toString());
        return new Promise((resolve, reject) => {
            pm2.delete(applicationId.toString(), () => {
                this.logger.log('application  '+ applicationId.toString() +' deleted');
                resolve();
            })
        })
    }

    startApplication(applicationId: ObjectId): void {
        const scriptPath = `${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}/dist/index.js`;
        this.logger.log('starting service for application '+applicationId.toString())
        this.logger.log('starting script at '+scriptPath)
        pm2.start({
            script: scriptPath,
            name: applicationId.toString(),
            log_file: `${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}/logs/log.log`,
            compress: true,
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        }, (error: any) => {
            if(error) {
                console.error(error)
                this.logger.error('error in starting process');
            }
        })
    }

    async restartApplication(applicationId: ObjectId) {
        const applicationPath = `${this.crudApplicationConfig.ROOTDIR}/${applicationId.toString()}`
        const cwd = process.cwd();
        this.logger.log('changing working directory '+applicationPath);
        process.chdir(applicationPath);
        await this.executeCommand('npm run build');
        this.logger.log('build completed');
        process.chdir(cwd)
        this.logger.log('working changed to root');
        this.logger.log('restarting application id '+applicationId.toString());
        pm2.restart(applicationId.toString(), (error: any) => {
            if(error) {
                console.error('error in restarting the application');
            }
        })
    }

    private executeCommand(command: string) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if(error) {
                    reject(error)
                    return
                }
                this.logger.log(stdout)
                resolve(stdout);
            })
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