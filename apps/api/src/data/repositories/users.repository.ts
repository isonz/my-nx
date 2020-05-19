import { EntityRepository } from 'typeorm';
import { BaseRepository } from './base';
import { Users } from '../entities/Users';

@EntityRepository(Users)
export class UsersRepository extends BaseRepository<Users> {

}
