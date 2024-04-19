import { Body, Controller, HttpCode, HttpStatus, Post, Patch,Query } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { RequestResetPasswordDto } from "./dto/request-reset-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Endpoint para solicitar restablecimiento de contraseña
  @HttpCode(HttpStatus.OK)
  @Patch("request")
  async requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ): Promise<void> {
    await this.authService.requestResetPassword(requestResetPasswordDto);
    return;
  }

  // Endpoint para restablecer la contraseña
  @HttpCode(HttpStatus.OK)
  @Patch("reset")
  async resetPassword(
    @Query('token') token: string, // Obtener el token de la URL
    @Body() resetPasswordDto: ResetPasswordDto, // DTO con la nueva contraseña
  ): Promise<void> {
    await this.authService.resetPassword(token, resetPasswordDto);
    
    return;
  }
  
}
