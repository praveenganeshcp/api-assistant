import { IsEmailIDUnique } from '@api-assistant/auth-be';
import {
  IsString,
  MinLength,
  MaxLength,
  IsStrongPassword,
  IsEmail,
  Validate,
} from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  username!: string;

  @IsString()
  @IsStrongPassword({
    minLength: 9,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password!: string;

  @IsEmail()
  @Validate(IsEmailIDUnique)
  emailId!: string;
}

export class LoginDTO {
  @IsEmail()
  emailId!: string;

  @IsStrongPassword({
    minLength: 9,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password!: string;
}

export class ResetPasswordDTO {
  @IsString()
  resetPasswordKey!: string;

  @IsString()
  @IsStrongPassword()
  oldPassword!: string;

  @IsString()
  @IsStrongPassword()
  newPassword!: string;
}

export class ResetPasswordLinkDTO {
  @IsEmail()
  emailId!: string;
}

export class EmailIdCheckerDTO {
  @IsEmail()
  emailId!: string;
}

export class VerifyAccountDTO {
  @IsString()
  verificationKey!: string;
}
