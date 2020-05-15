import { Controller, Get, Post } from '@nestjs/common';

import { LoginAccount } from '@my-nx/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/auth/login')
  getData(): LoginAccount {
    return this.appService.getData();
  }

  @Post('/auth/login')
  getPostData(): LoginAccount {
    return this.appService.getData();
  }

}
