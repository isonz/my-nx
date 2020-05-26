import { Injectable } from '@angular/core';
import { HttpService } from '../../share/services/http.service';
import { RepositoryService } from '../../share/services/repository.service';

@Injectable({
  providedIn: 'root'
})
export class AdminsService extends RepositoryService{

  constructor( public http: HttpService ) {
    super(http, { controller: { name: "admins" } });
  }

}
