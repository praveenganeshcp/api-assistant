import { Repository } from "@api-assistant/repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationCounterRepository extends Repository<{ _id: 'app_counter', port: number }> {

    constructor() {
        super('application_counter');
    }

    async getPort(): Promise<number> {
        const result = await this.findOneAndUpdate(
            { _id: 'app_counter' },
            { $inc: { port: 1 } },
            { upsert: true, returnDocument: 'after' }
        )
        return result.value?.port as number;
    }
}