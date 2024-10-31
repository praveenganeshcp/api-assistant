import { Usecase } from "@api-assistant/commons-be";
import { ObjectId } from "mongodb";
import { exec } from "child_process";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { mkdir, writeFile } from "fs/promises";
import { CloudCodeProcessManagerService } from "./cloud-code-process-manager.service";
import { dbConfig } from "@api-assistant/configuration-be";
import { ConfigType } from "@nestjs/config";

interface BootstrapApplicationUsecaseInput {
    applicationId: ObjectId;
    port: number;
}

@Injectable()
export class BootstrapApplicationUsecase implements Usecase<BootstrapApplicationUsecaseInput, void> {

    private readonly logger = new Logger(BootstrapApplicationUsecase.name);

    constructor(
        private readonly cloudCodeProcessManagerService: CloudCodeProcessManagerService,
        @Inject(dbConfig.KEY) private readonly databaseConfig: ConfigType<typeof dbConfig>
    ) {}

    async execute(data: BootstrapApplicationUsecaseInput): Promise<void> {
        const applicationsRootPath = "/Users/praveenkumar/Documents/projects/cloud_code"
        const applicationGitUrl = "https://github.com/praveenganeshcp/express_base_template.git";
        const applicationPath = `${applicationsRootPath}/${data.applicationId.toString()}`;
        await mkdir(applicationPath, {recursive: true})
        const cwd = process.cwd();
        this.logger.log('changing working directory '+applicationPath);
        process.chdir(applicationPath);
        this.logger.log('cloning repo')
        await this.executeCommand(`git clone ${applicationGitUrl} ${applicationPath}`)
        this.logger.log('repo cloned')
        await this.executeCommand('npm install');
        this.logger.log('dependencies installed')
        this.logger.log('creating env');
        await writeFile(`${applicationPath}/config.js`, `
        module.exports = {
            PORT: ${data.port},
            DB_URL: '${this.databaseConfig.DB_URL}',
            API_ID: '${data.applicationId.toString()}'
        }    
        `, 'utf-8');
        this.logger.log('env created');
        await this.cloudCodeProcessManagerService.startApplication(data.applicationId);
        process.chdir(cwd)
        this.logger.log('working changed to root');
    }

    private executeCommand(command: string) {
        this
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if(error) {
                    reject(error)
                    return
                }
                resolve(stdout);
            })
        })
    }
}