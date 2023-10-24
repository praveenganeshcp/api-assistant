import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name!: string;
}
