import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { CreateAccountUsecase } from "../usecases/create-account.usecase";
import { Response } from "express";
import { UserDetails } from "../entities/user.entity";
import { AuthUser } from "apps/backend/src/utils/decorators";

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

    @Get("profile")
    public async fetchProfile(@AuthUser() userDetails: UserDetails): Promise<UserDetails> {
        return userDetails;
    }
}