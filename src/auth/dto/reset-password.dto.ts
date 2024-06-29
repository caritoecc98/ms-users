import { Transform } from "class-transformer";
import { IsString, MinLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  temporaryPass: string;

  @IsString()
  @MinLength(8,{ message: 'La contraseña debe tener al menos 6 caracteres' })
  @Transform(({ value }) => value.trim())
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
  @Matches(/^[^\u00C0-\u017F\s]+$/,{ message: 'La contraseña no debe contener tildes' })
  newPassword: string;
  
}