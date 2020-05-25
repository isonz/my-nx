import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { AdminsDto } from '@my-nx/api-interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //ignoreExpiration: false,
      secretOrKey: environment.jwtSecret,
    });
    // console.log('JwtStrategy');
  }

  async validate(payload: AdminsDto, done: Function) {
    const user = await this.authService.validateAccount(payload);
    // console.log(user);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
    // return { userId: payload.id, username: payload.account };
  }


}
