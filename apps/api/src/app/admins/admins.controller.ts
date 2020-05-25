import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { AdminsDto } from '@my-nx/api-interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ControllerService } from '../../common/services/controller.service';
import { Admins } from '../../data/entities/Admins';


@Controller('admins')
@UseGuards(JwtAuthGuard)
export class AdminsController extends ControllerService<Admins>{

  constructor(
    private readonly adminsService: AdminsService) {
    super(adminsService)
  }

  @Get('')
  index(){
    return 'This is admins.';
  }

  @Post('list')
  async list(@Body() params): Promise<any> {
    const admins: AdminsDto = {
      id: 1,
      account: 'admin',
      permissions: 'admin',
      nickname: 'Admin',
      avatar: 'avatar-avatar-avatar',
      createAt: null,
      updateAt: null
    };
    return [admins];
  }

}
