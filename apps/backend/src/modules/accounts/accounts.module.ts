import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AccountsController } from "./controllers/accounts.controller";
import { IsEmailIDUnique } from "./validators/emailid.validator";
import { AccountsRepository } from "./repository/accounts.repository";
import { AccountsService } from "./services/accounts.service";
import { CreateAccountUsecase } from "./usecases/create-account.usecase";
import { JWTService } from "./services/jwt.service";
import { AuthenticationMiddleware } from "./middlewares/authentication.middleware";
import { PasswordManagerService } from "./services/password-manager.service";
import { LoginUseCase } from "./usecases/login.usecase";
import { NotificationsModule } from "../notification/notification.module";
import { VerifyAccountUsecase } from "./usecases/verify-account.usecase";

@Module({
    imports: [NotificationsModule],
    controllers: [
        AccountsController
    ],
    providers: [
        AccountsService,
        AccountsRepository,
        IsEmailIDUnique,
        CreateAccountUsecase,
        JWTService,
        PasswordManagerService,
        LoginUseCase,
        VerifyAccountUsecase
    ]
})
export class AccountsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware).forRoutes({
                path: "/accounts/profile", method: RequestMethod.GET
            })
    }
}