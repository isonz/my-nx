import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminsService } from '../admins/services/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from '../../data/repositories/admins.repository';
import { environment } from '../../environments/environment';


@Module({

  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: { expiresIn: '60s' }
    }),
    TypeOrmModule.forFeature([AdminsRepository]),
  ],
  providers: [AuthService, AdminsService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
