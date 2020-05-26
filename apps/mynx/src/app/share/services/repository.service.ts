import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';

export interface Id {
  id: string | number;
}

export interface Controller {
  name: string
}

export interface RepositoryOption {
  controller: Controller
}

export interface ResultList<T> {
  list?: T[],
  count?: number;
  query?: Query;
}

export interface Query {
  index?: number;
  size?: number;
  filter?: any;
}


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(
    public http: HttpService,
    public option: RepositoryOption
  ) { }

  api_url = environment.api_url;

  findAll(query?: Query) {
    let param: Query = { index: 1, size: 50 };
    if (query) {
      param = Object.assign(param, query)
    }
    return this.http.get(`${this.api_url + this.option.controller.name}/${param.size}/${param.index}`, query.filter);
  }

  findOne(id) {
    return this.http.get(`${this.api_url + this.option.controller.name}/${id}`);
  }

  create(entity) {
    // if (_.has(entity, 'id')) { entity = _.omit(entity, ['id']) }
    return this.http.post(`${this.api_url + this.option.controller.name}`, entity);
  }

  update(entity) {
    return this.http.put(`${this.api_url + this.option.controller.name}`, entity);
  }

  remove(id) {
    return this.http.delete(`${this.api_url + this.option.controller.name}/${id}`);
  }

}
