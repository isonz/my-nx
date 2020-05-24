import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsDto } from '@my-nx/api-interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('admins')
export class AdminsController {

  constructor(private readonly adminsService: AdminsService) {}

  @Get('')
  index(){
    return 'This is admins.';
  }

  @Post('list')
  async list(@Body() params): Promise<any> {
    const admins: AdminsDto = {
      id: 1,
      account: 'admin',
      token: 'token-token-token-token-token',
      permissions: 'admin',
      nickname: 'Admin',
      avatar: 'avatar-avatar-avatar',
      createAt: null,
      updateAt: null
    };
    return [admins];
  }

}
