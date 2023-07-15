import { Body, Controller, Get, Patch, Post, Res } from "@nestjs/common";
import { CreateAccountDTO } from "../dto/create-account.dto";
import { CreateAccountUsecase } from "../usecases/create-account.usecase";
import { Response } from "express";
import { UserDetails } from "../entities/user.entity";
import { AuthUser } from "@api-assistant/utils";
import { LoginDTO } from "../dto/login.dto";
import { LoginUseCase } from "../usecases/login.usecase";
import { VerifyAccountUsecase } from "../usecases/verify-account.usecase";

@Controller('accounts')
export class AccountsController {

    constructor(
        private readonly createAccountUsecase: CreateAccountUsecase,
        private readonly loginUsecase: LoginUseCase,
        private verifyAccountUsecase: VerifyAccountUsecase
    ) {}

    @Post('signup')
    public async createAccount(
        @Body() createAccountPayload: CreateAccountDTO,
        @Res({ passthrough: true }) response: Response
    ) {
        const { token, user } = 
            await this.createAccountUsecase.execute(createAccountPayload);
        response
            .cookie('token', token)
            .json(user)
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
        const { token, user } = await this.loginUsecase.execute(loginDTO);
        response
            .cookie('token', token)
            .status(200)
            .json(user);
    }

    @Post("logout")
    public logout(@Res({passthrough: true}) response: Response) {
        response
            .cookie('token', '')
            .status(200)
            .json()
    }

    @Patch('verify-account')
    public async verifyAccount(
        @Res({ passthrough: true }) response: Response,
        @Body('verificationKey') verificationKey: string
    ) {
        const { token, user } = 
            await this.verifyAccountUsecase.execute(verificationKey);
        response
            .cookie('token', token)
            .json(user)
    }
}