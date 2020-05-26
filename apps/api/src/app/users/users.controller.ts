import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { JwtAuthGuard } from '../RBAC/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService ) {}

  @Get('')
  index(){
    return 'This is users index.';
  }


}
