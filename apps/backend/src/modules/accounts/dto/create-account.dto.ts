import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength, Validate } from "class-validator";
import { IsEmailIDUnique } from "../validators/emailid.validator";

export class CreateAccountDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    username!: string;

    @IsString()
    @IsStrongPassword()
    password!: string;

    @IsEmail()
    @Validate(IsEmailIDUnique)
    emailId!: string;
}