import { Injectable } from '@nestjs/common';
import { Admins } from '../../../../data/entities/Admins';
import { RepositoryService } from '../../../../common/services/repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService extends RepositoryService<Admins>{

  constructor(
    @InjectRepository(Admins)
    private readonly adminsRepository: Repository<Admins>,
  ) {
    super(adminsRepository);
  }

  async findByAccount(account: string): Promise<Admins> {
    return this.adminsRepository.findOne({ account: account });
  }

}
