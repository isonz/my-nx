import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  // // jwt 到期后继续有效 //危险
  // handleRequest(err, user, info: Error, context) {
  //   console.log(context.getRequest().headers);
  //   if (info instanceof Error) {
  //     if('TokenExpiredError' !== info.name){
  //       throw new UnauthorizedException();
  //     }
  //   }
  //   return user;
  //
  // }


}
