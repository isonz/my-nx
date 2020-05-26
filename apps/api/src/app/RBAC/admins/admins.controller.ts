import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminsService } from './services/admins.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ControllerService } from '../../../common/services/controller.service';
import { Admins } from '../../../data/entities/Admins';


@Controller('admins')
@UseGuards(JwtAuthGuard)
export class AdminsController extends ControllerService<Admins>{

  constructor(
    private readonly adminsService: AdminsService) {
    super(adminsService)
  }

}
