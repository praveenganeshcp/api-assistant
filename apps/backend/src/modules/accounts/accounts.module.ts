import { Module } from "@nestjs/common";
import { AccountsController } from "./controllers/accounts.controller";
import { IsEmailIDUnique } from "./validators/emailid.validator";
import { AccountsRepository } from "./repository/accounts.repository";
import { AccountsService } from "./services/accounts.service";
import { CreateAccountUsecase } from "./usecases/create-account.usecase";
import { JWTService } from "./services/jwt.service";

@Module({
    controllers: [
        AccountsController
    ],
    providers: [
        AccountsService,
        AccountsRepository,
        IsEmailIDUnique,
        CreateAccountUsecase,
        JWTService
    ]
})
export class AccountsModule {}