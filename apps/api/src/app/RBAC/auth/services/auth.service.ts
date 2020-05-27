import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminsService } from '../../admins/services/admins.service';
import * as jwt from 'jsonwebtoken';
import { AdminsDto } from '@my-nx/api-interfaces';
import { Admins } from '../../../../data/entities/Admins';
import { environment } from '../../../../environments/environment';
import { JwtPayload } from '../jwt-payload.interface';
import { HttpEnum } from '../../../../common/enums/http.enum';
import { sha256 } from '../../../../common/utils/crypto';



@Injectable()
export class AuthService {

  admin: Admins;
  expires = '1d';

  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  async createToken(id: number): Promise<any> {
    const user: JwtPayload = { id: id };
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
                throw new HttpException(HttpEnum.UNKNOWN, HttpStatus.UNAUTHORIZED);
            })
            .catch(z => y(z))
        })
      } else {
        throw new HttpException(HttpEnum.USER_PASSWORD_INVALID, HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException(HttpEnum.USER_ACCOUNT_INVALID, HttpStatus.UNAUTHORIZED);
    }
  }

  async validateAccount(payload: AdminsDto): Promise<any> {
    return this.adminsService.findOne(payload.id);
  }

}
