import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export class BaseRepository<Entity extends ObjectLiteral> extends Repository<Entity> {

}
