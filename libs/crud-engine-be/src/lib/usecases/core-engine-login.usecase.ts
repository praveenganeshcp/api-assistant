import { CanBeNull, Usecase } from "@api-assistant/commons-be";
import { CoreEngineCRUDUsecase, CoreEngineCRUDUsecaseInput } from "./core-engine-crud.usecase";
import { Injectable, Logger } from "@nestjs/common";
import { CoreEngineJWTService } from "../services/core-engine-jwt.service";
import { InvalidLoginException } from "@api-assistant/crud-engine-core";
import { ObjectId } from "mongodb";

interface CoreEngineLoginUsecaseOutput {
    user: {
        id: string;
        username: string;
        emailId: string;
    };
    token: string;
}

interface CoreEngineLoginResponse {
    user: {
        _id: ObjectId;
        username: string;
        emailId: string;
        password: string;
    }
}

@Injectable()
export class CoreEngineLoginUsecase implements Usecase<CoreEngineCRUDUsecaseInput, CoreEngineLoginUsecaseOutput> {

    private readonly logger = new Logger(CoreEngineLoginUsecase.name);

    constructor(
        private readonly coreEngineCRUDUsecase: CoreEngineCRUDUsecase,
        private readonly coreEngineJWTService: CoreEngineJWTService
    ) {}

    async execute(data: CoreEngineCRUDUsecaseInput): Promise<CoreEngineLoginUsecaseOutput> {
        this.logger.log('checking login user account', data);
        const response = await this.coreEngineCRUDUsecase.execute(data) as CanBeNull<CoreEngineLoginResponse>;
        if(!response?.user) {
            this.logger.log('login failed');
            throw new InvalidLoginException()
        }
        const { user } = response;
        this.logger.log('user record fetched to verify login' + user.emailId);
        if(response.user.password !== data.placeholderDataSouce.requestBody['password']) {
            this.logger.log('login failed');
            throw new InvalidLoginException()
        }
        const token = this.coreEngineJWTService.createToken(user._id.toString());
        this.logger.log('token generated');
        return { user: {
            id: user._id.toString(),
            username: user.username,
            emailId: user.emailId
        }, token };
    }
}