import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAccount } from '@my-nx/api-interfaces';

@Controller('auth')
export class AuthController {

  private loginAccount:LoginAccount;

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    this.loginAccount.username = req.username;
    this.loginAccount.password = req.password;
    return this.authService.login(this.loginAccount);
  }

}
