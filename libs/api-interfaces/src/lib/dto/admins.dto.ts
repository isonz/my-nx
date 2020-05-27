export interface AdminsDto {
  id: number;
  account: string;
  permissions: string;
  nickname: string;
  avatar: string;
  createAt: Date;
  updateAt: Date;
}

export interface AdminsLoginDto {
  id: number;
  account: string;
  token: string;
  permissions: string;
  nickname: string;
  avatar: string;
}


// https://github.com/typestack/class-validator
// export class RegisterInfoDTO {
//   @IsNotEmpty({ message: '用户名不能为空' })
//   readonly accountName: string | number;
//   @IsNotEmpty({ message: '真实姓名不能为空' })
//   @IsString({ message: '真实姓名必须是 String 类型' })
//   readonly realName: string;
//   @IsNotEmpty({ message: '密码不能为空' })
//   readonly password: string;
//   @IsNotEmpty({ message: '重复密码不能为空' })
//   readonly repassword: string;
//   @IsNotEmpty({ message: '手机号不能为空' })
//   @IsNumber()
//   readonly mobile: number;
//   readonly role?: string | number;
// }

/**

 @UseGuards(AuthGuard('jwt'))
 @UsePipes(new ValidationPipe()) // 使用管道验证
 @Post('register')
 async register(@Body() body: RegisterInfoDTO) { // 指定 DTO类型
    return await this.usersService.register(body);
  }

 */
