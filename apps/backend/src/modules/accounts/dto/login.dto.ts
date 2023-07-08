import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDTO {
    @IsEmail()
    emailId!: string;

    @IsStrongPassword()
    password!: string;
}