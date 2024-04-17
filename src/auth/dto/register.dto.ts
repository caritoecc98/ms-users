import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsNotEmpty,Matches } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())  //Elimina espacios en blanco
  @Matches(/^[^\u00C0-\u017F]+$/, { message: 'El correo no debe contener tildes' })
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())  //Elimina espacios en blanco
  @MinLength(6,{ message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
  @Matches(/^[^\u00C0-\u017F\s]+$/,{ message: 'La contraseña no debe contener tildes' })
  password: string;
}