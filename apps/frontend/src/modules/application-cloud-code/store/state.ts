import { ServerData } from "@api-assistant/commons-be";

export interface ApplicationCloudCodeState {
    requestHandlers: ServerData<string[]>;
    processStatus: ServerData<{
        status: string,
        restartCount: number
    }>
}