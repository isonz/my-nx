import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() params): Promise<any> {
    const account = params.account;
    const password = params.password;
    if(!account || !password) return null;
    return this.authService.login(account, password);
  }

  @Post('re-token')
  async reToken(@Body() params): Promise<any> {
    const tokenRef = params.tokenRef;
    if(!tokenRef) return null;
    return await this.authService.reToken(tokenRef);
  }

}
