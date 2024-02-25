import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDTO {
    @IsEmail()
    emailId!: string;

    @IsStrongPassword({
        minLength: 9,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    })
    password!: string;
}