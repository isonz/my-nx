import { Injectable } from '@nestjs/common';
import { LoginAccount } from '@my-nx/api-interfaces';

@Injectable()
export class AppService {
  getData(): LoginAccount {
    return {
      id: 1,
      username: 'ison',
      password: '',
      token: 'asdfasdfasdfasdfewefef'
    };
  }
}
