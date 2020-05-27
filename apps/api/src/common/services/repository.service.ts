import { Injectable } from "@nestjs/common";
import { Repository, ObjectID, getManager } from "typeorm";
import { ResultList } from "../interfaces/result.interface";
import { idDeUUID, idToUUID } from '../utils/crypto';

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
        if('undefined' !== typeof list[k].id){
          list[k].id = idToUUID(list[k].id);
        }else{
          break;
        }
      }
      // result.list = list;
      // console.log(idDeUUID('03ff8435-90b1-6c35-07c2-1622960d3fbe'));

      x(result);
    })
  }

  async findOne(id: string | number | Date | ObjectID): Promise<T> {
    if('number' !== typeof id) id = idDeUUID(id);
    return await this.repository.findOne(id);
  }

  async create(entity: any): Promise<any> {
    return await this.repository.save(entity);
  }

  async update(entity: T): Promise<any> {
    let index = await this.repository.findOne(entity.id);
    if('number' !== typeof index) index = idDeUUID(index);
    if (index) {
      Object.assign(index, entity);
      await getManager().transaction(async transactionalEntityManager => {
        await transactionalEntityManager.save(index);
      });

      return index
    }
  }

  async remove(id: string | number | Date | ObjectID): Promise<any> {
    if('number' !== typeof id) id = idDeUUID(id);
    const entity = await this.repository.findOne(id);
    return await this.repository.remove(entity);
  }

}
