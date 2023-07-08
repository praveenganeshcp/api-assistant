import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { CreateAccountUsecase } from "../usecases/create-account.usecase";
import { Response } from "express";
import { UserDetails } from "../entities/user.entity";
import { AuthUser } from "apps/backend/src/utils/decorators";
import { LoginDTO } from "../dto/login.dto";
import { LoginUseCase } from "../usecases/login.usecase";

@Controller('accounts')
export class AccountsController {

    constructor(
        private readonly createAccountUsecase: CreateAccountUsecase,
        private readonly loginUsecase: LoginUseCase
    ) {}

    @Post('signup')
    public async createAccount(
        @Body() createAccountPayload: CreateAccountDTO,
    ) {
        await this.createAccountUsecase.execute(createAccountPayload);
        return {message: "User account created successfully"};
    }

    @Get("profile")
    public async fetchProfile(@AuthUser() userDetails: UserDetails): Promise<UserDetails> {
        return userDetails;
    }

    @Post("login")
    public async login(
        @Body() loginDTO: LoginDTO,
        @Res({passthrough: true}) response: Response
    ) {
        const jwt = await this.loginUsecase.execute(loginDTO);
        response
            .cookie('token', jwt)
            .status(200)
            .json({message: "Authenticated successfully"});
    }
}