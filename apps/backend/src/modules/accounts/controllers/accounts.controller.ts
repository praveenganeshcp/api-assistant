import { Body, Controller, Post, Res } from "@nestjs/common";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { CreateAccountUsecase } from "../usecases/create-account.usecase";
import { Response } from "express";

@Controller('accounts')
export class AccountsController {

    constructor(
        private createAccountUsecase: CreateAccountUsecase
    ) {}

    @Post('signup')
    public async createAccount(
        @Body() createAccountPayload: CreateAccountDTO,
        @Res({passthrough: true}) response: Response
    ) {
        const jwt = await this.createAccountUsecase.execute(createAccountPayload);
        response.cookie("token", jwt);
        response.json({message: "User account created successfully"});
    }
}