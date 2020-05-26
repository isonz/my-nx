import { Injectable } from '@angular/core';
import { HttpService } from '../../share/services/http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from '../../auth/auth.service';
import { ToastService } from '../../share/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(
    private http: HttpService,
    public toastService: ToastService,
  ) {

  }

  adminList = Array;

  getList(): Observable<Array<Account>> {
    return this.http.post<Array<Account>>('/api/admins/list', {}).pipe(
      tap(
        val => {
            this.adminList = val;
            return this.adminList;
        }
      )
    );
  }

}
