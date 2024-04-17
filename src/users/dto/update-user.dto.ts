import { IsString, MinLength, Matches, NotEquals } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  newPassword: string;

  @IsString()
  resetPasswordToken: string; 
}