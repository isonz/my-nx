import { Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/services/admins.service';
import { sha256 } from 'js-sha256';
import * as jwt from 'jsonwebtoken';
import { AdminsDto, AdminsLoginDto } from '@my-nx/api-interfaces';
import { Admins } from '../../../data/entities/Admins';
import { environment } from '../../../environments/environment';
import { ApiException } from '../../../common/exception/http.exception';
import { ApiErrorCode } from '../../../common/enums/api-error-code.enum';
import { JwtPayload } from '../jwt-payload.interface';



@Injectable()
export class AuthService {

  admin: Admins;
  expires = 1800;

  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  async createToken(id: number): Promise<any> {
    const user: JwtPayload = { id: id }
    return jwt.sign(user, environment.jwtSecret, { expiresIn: this.expires });
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
          this.createToken(this.admin.id)
            .then(z => x({ account: this.admin.account, token: z, permissions: 'Admin' }), err => {
                throw new ApiException('未知错误'+err.toString(), 1000000 );
            })
            .catch(z => y(z))
        })
      } else {
        throw new ApiException('密码错误', ApiErrorCode.USER_ACCOUNT_PASSWORD_INVALID );
      }
    } else {
      throw new ApiException('账号不存在', ApiErrorCode.USER_ACCOUNT_PASSWORD_INVALID );
    }
  }

  async validateAccount(payload: AdminsDto): Promise<any> {
    return this.adminsService.findOne(payload.id);
  }

}
