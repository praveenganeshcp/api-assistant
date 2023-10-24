import { IsString, IsStrongPassword } from 'class-validator';

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
