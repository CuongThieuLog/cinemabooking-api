import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResendVerifyAccountDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  VerifyAccountDto,
} from './dto/auth.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: SignUpDto) {
    return await this.authService.register(data);
  }

  @Post('/login')
  async login(@Body() data: SignInDto) {
    return await this.authService.login(data);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    const { email } = data;

    return await this.authService.forgotPassword(email);
  }

  @Post('/reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    const { token, password } = data;

    return await this.authService.resetPassword(token, password);
  }

  @Post('/verify-account')
  async verifyAccount(@Body() data: VerifyAccountDto) {
    const { token } = data;

    return await this.authService.verifyAccount(token);
  }

  @Post('/resent-verify-account')
  async resentVerifyAccount(@Body() data: ResendVerifyAccountDto) {
    const { email } = data;

    return await this.authService.resendVerifyToken(email);
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() data: VerifyAccountDto) {
    const { token } = data;

    return await this.authService.validateResetPasswordOtp(token);
  }

  @Post('/resend-otp')
  async resendOtp(@Body() data: ResendVerifyAccountDto) {
    const { email } = data;

    return await this.authService.resendOtp(email);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(@Body() data: ChangePasswordDto) {
    const { password, new_password, id } = data;

    return await this.authService.changePassword(id, password, new_password);
  }

  @Get('me')
  async getMe(@Body() { token }: { token: string }) {
    try {
      const user = await this.authService.getMe(token);
      return { user };
    } catch (error) {
      return { error: error.message };
    }
  }
}
