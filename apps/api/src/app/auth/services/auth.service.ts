import { Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/services/admins.service';
import { sha256 } from 'js-sha256';
import * as jwt from 'jsonwebtoken';
import { AdminsLoginDto } from '@my-nx/api-interfaces';
import { Admins } from '../../../data/entities/Admins';
import { environment } from '../../../environments/environment';
import { ApiException } from '../../../common/exception/http.exception';
import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';



@Injectable()
export class AuthService {

  admin: Admins;
  adminsLoginDto: AdminsLoginDto;
  expires = 1800;

  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  async createToken(admin: Admins): Promise<any> {
    this.adminsLoginDto = {
      id: admin.id,
      account: admin.account,
      token: admin.slat,
      permissions: 'admin',
      nickname: admin.nickname,
      avatar: admin.avatar
    };
    return jwt.sign(this.adminsLoginDto, environment.jwtSecret, { expiresIn: this.expires });
  }

  async login(account: string, password: string): Promise<any> {
    this.admin = await this.adminsService.findByAccount(account);
    // console.log(this.admin);
    if (this.admin !== undefined) {
      const pwd = this.admin.password;
      const salt = this.admin.slat;
      password = sha256(password + salt);
      if (pwd === password) {
        return new Promise((x, y) => {
          this.createToken(this.admin)
            .then( data => {
              this.adminsLoginDto.token = data;
              x(this.adminsLoginDto);
            }, err => {
                console.log(err);
            })
            .catch(z => y(z))
        })
      } else {
        throw new ApiException('用户账号或密码无效！', ApiErrorCode.USER_ACCOUNT_PASSWORD_INVALID );
      }
    }
  }


}
