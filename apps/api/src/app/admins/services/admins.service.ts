import { Injectable } from '@nestjs/common';
import { AdminsRepository } from '../../../data/repositories/admins.repository';
import { Admins } from '../../../data/entities/Admins';

@Injectable()
export class AdminsService {

  constructor(
    private readonly adminsRepository: AdminsRepository,
  ) {}

  async findByAccount(account: string): Promise<Admins> {
    return this.adminsRepository.findOne({ account: account });
  }

}
