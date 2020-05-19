import { EntityRepository } from 'typeorm';
import { BaseRepository } from './base';
import { Admins } from '../entities/Admins';

@EntityRepository(Admins)
export class AdminsRepository extends BaseRepository<Admins> {

}
