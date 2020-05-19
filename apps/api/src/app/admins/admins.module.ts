import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './services/admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from '../../data/repositories/admins.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsRepository])],
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}
