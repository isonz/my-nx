import { Injectable } from '@nestjs/common';
import { Admins } from '../../../../data/entities/Admins';
import { RepositoryService } from '../../../../common/services/repository.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { idToUUID } from '../../../../common/utils/crypto';

@Injectable()
export class AdminsService extends RepositoryService<Admins>{

  constructor(
    @InjectRepository(Admins)
    private readonly adminsRepository: Repository<Admins>,
  ) {
    super(adminsRepository);
  }

  async findByAccount(account: string): Promise<Admins> {
    const entity = await this.adminsRepository.findOne({account: account});
    if('undefined' !== typeof entity && 'undefined' !== typeof entity.id && 'number' === typeof entity.id) entity.id = idToUUID(entity.id);
    return entity;
  }

}
