import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminsService } from '../admins/services/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from '../../../data/entities/Admins';


@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  providers: [AuthService, AdminsService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
