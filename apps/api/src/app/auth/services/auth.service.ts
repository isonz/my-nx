import { Injectable } from '@nestjs/common';
import { LoginAccount } from '@my-nx/api-interfaces';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  private loginAccount:LoginAccount;

  async login(loginAccount: LoginAccount): Promise<any> {
    this.loginAccount = loginAccount;
    // this.user = await this.userRepository.findOne({ account: account }, { relations: ['roles'] });
    // if (this.user != undefined && this.user.password == password) {
    //   let permissions = await this.getPermissions(this.user);
    //   return new Promise((x, y) => {
    //     this.createToken(this.user.id)
    //       .then(z => x({ name: this.user.name, token: z, permissions: permissions }))
    //       .catch(z => y(z))
    //   })
    // } else {
    //   throw new ApiException('用户账号或密码无效！', ApiErrorCode.USER_ACCOUNT_PASSWORD_INVALID, HttpStatus.BAD_REQUEST);
    // }
  }

  // async login() : LoginAccount {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }


}
