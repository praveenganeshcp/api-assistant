import { 
    ValidationArguments, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";
import { Injectable } from "@nestjs/common";
import { AccountsService } from "../services/accounts.service";

@Injectable()
@ValidatorConstraint({name: "uniqueEmailValidator", async: true})
export class IsEmailIDUnique implements ValidatorConstraintInterface {

    constructor(
        private readonly accountsService: AccountsService
    ) {}

    public validate(email: string, validationArguments?: ValidationArguments) {
        return this.accountsService.isEmailIdUnique(email)
    }

    public defaultMessage(validationArguments?: ValidationArguments): string {
        return "Email id must be unique";
    }
}