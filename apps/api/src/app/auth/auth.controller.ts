import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() params): Promise<any> {
    // console.log(params);
    return this.authService.login(params.account, params.password);
  }

}
