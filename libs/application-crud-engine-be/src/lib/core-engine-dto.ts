import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CoreEngineCreateAccountDTO {
  @IsString({})
  username!: string;

  @IsStrongPassword()
  password!: string;

  @IsEmail()
  emailId!: string;
}

export class CoreEngineLoginAccountDTO {
  @IsStrongPassword()
  password!: string;

  @IsEmail()
  emailId!: string;
}
