import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength,IsOptional, IsNotEmpty,Matches } from "class-validator";
import { number } from "joi";
import { ResetPasswordDto } from '../../auth/dto/reset-password.dto';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'El nombre no debe contener caracteres especiales' })
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'El apellido no debe contener caracteres especiales' })
  lastName: string;

  
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value.trim())  //Elimina espacios en blanco
  @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
  email: string;

}
