import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './services/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from '../../data/entities/Admins';

@Module({
  imports: [TypeOrmModule.forFeature([Admins])],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
