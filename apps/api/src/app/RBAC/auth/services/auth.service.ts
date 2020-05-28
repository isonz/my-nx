import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/services/admins.service';
import * as jwt from 'jsonwebtoken';
import { AdminsDto } from '@my-nx/api-interfaces';
import { Admins } from '../../../../data/entities/Admins';
import { environment } from '../../../../environments/environment';
import { JwtPayload } from '../jwt-payload.interface';
import { HttpEnum } from '../../../../common/enums/http.enum';
import { sha256, testUUID, uuidToId } from '../../../../common/utils/crypto';



@Injectable()
export class AuthService {

  admin: Admins;
  token_expires = 10;
  token_ref_expires = '1d';

  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  async createToken(id: number | string): Promise<any> {
    const user: JwtPayload = { id: id };
    return {
      token: jwt.sign(user, environment.jwtSecret, { expiresIn: this.token_expires }),
      tokenRef: jwt.sign(user, environment.jwtRefSecret, { expiresIn: this.token_ref_expires })
    }
  }

  async login(account: string, password: string): Promise<any> {
    this.admin = await this.adminsService.findByAccount(account);
    // console.log(this.admin);
    if (this.admin !== undefined) {
      const pwd = this.admin.password;
      const salt = this.admin.slat;
      password = sha256(password + salt);
      if (pwd === password) {
        return await this.returnJwt();
      } else {
        throw new HttpException(HttpEnum.USER_PASSWORD_INVALID, HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException(HttpEnum.USER_ACCOUNT_INVALID, HttpStatus.UNAUTHORIZED);
    }
  }

  async returnJwt (){
    return new Promise((x, y) => {
      this.createToken(this.admin.id)
        .then(z => x({ account: this.admin.account, token: z.token, tokenRef: z.tokenRef, permissions: 'Admin' }), err => {
          throw new HttpException(HttpEnum.UNKNOWN, HttpStatus.UNAUTHORIZED);
        })
        .catch(z => y(z))
    })
  }

  async validateAccount(payload: AdminsDto): Promise<any> {
    return this.adminsService.findOne(payload.id);
  }

  async reToken(tokenRef: string): Promise<any> {
      const that = this;
      return jwt.verify(tokenRef, environment.jwtRefSecret, async function(err, data) {
        if (err) return null;
        // console.log(data);
        if('undefined' === typeof data.id) return null;

        that.admin = await that.adminsService.findOne(data.id);
        return await that.returnJwt();
      });
  }

}
