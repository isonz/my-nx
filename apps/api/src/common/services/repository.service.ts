import { Injectable } from "@nestjs/common";
import { Repository, ObjectID, getManager } from "typeorm";
import { ResultList } from "../interfaces/result.interface";
import { uuidToId, idToUUID, testUUID } from '../utils/crypto';

export interface Id {
  id: string | number | Date | ObjectID;
}

@Injectable()
export class RepositoryService<T extends Id> {

  constructor(
    private repository: Repository<T>
  ) { }

  async findAll(index: number, size: number, query: any): Promise<ResultList<T>> {
    return new Promise<ResultList<T>>(async (x) => {
      const result: ResultList<T> = {
        list: await this.repository.find({ skip: size * (index - 1), take: size }),
        count: await this.repository.count(),
        query: {
          index: index,
          size: size
        }
      };

      //加密ID
      const list = result.list;
      for (const k in list){
        if('undefined' !== typeof list[k].id  && 'number' === typeof list[k].id){
          list[k].id = idToUUID(list[k].id);
        }else{
          break;
        }
      }
      // result.list = list;
      // console.log(uuidToId('03ff8435-90b1-6c35-07c2-1622960d3fbe'));

      x(result);
    })
  }

  async findOne(id: string | number | Date | ObjectID): Promise<T> {
    const uuid = id;
    if(testUUID(uuid)) id = uuidToId(uuid);
    const obj = await this.repository.findOne(id);
    if(testUUID(uuid)) obj.id = uuid;
    return obj;
  }

  async create(entity: any): Promise<any> {
    entity = await this.repository.save(entity);
    if('undefined' !== typeof entity.id && 'number' === typeof entity.id) entity.id = idToUUID(entity.id);
    return entity;
  }

  async update(entity: T): Promise<any> {
    let uuid;
    if('undefined' !== typeof entity.id && testUUID(entity.id) ){
      uuid = entity.id;
      entity.id = uuidToId(entity.id);
    }
    const index = await this.repository.findOne(entity.id);
    if (index) {
      Object.assign(index, entity);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });

      if('undefined' !== typeof index.id && 'number' === typeof index.id && !uuid ) index.id = uuid;
      return index
    }
  }

  async remove(id: string | number | Date | ObjectID): Promise<any> {
    const uuid = id;
    if(testUUID(uuid)) id = uuidToId(uuid);
    let entity = await this.repository.findOne(id);
    entity =  await this.repository.remove(entity);
    if('undefined' !== typeof entity.id && 'number' === typeof entity.id && testUUID(uuid)) entity.id = uuid;
    return entity;
  }

}
