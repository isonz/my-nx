import { Injectable } from '@angular/core';

import { Observable, range } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { AdminsLoginDto } from '@my-nx/api-interfaces';
import { HttpService } from '../share/services/http.service';
import { ToastService } from '../share/services/toast.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService,
    public toastService: ToastService
  ) {}

  isLoggedIn = false;
  redirectUrl: string;


  login(account: string, password: string): Observable<Account> {
    return this.http.post<Account>('/api/auth/login', {account, password}).pipe(
      // retry(3),
      tap(
        val => {
            if(!val){
              this.toastService.open('用户名或密码不正确！');
              return false;
            }else {

              this.isLoggedIn = true;
            }
          },
        err => {
          this.toastService.open('网络出现错误，请稍后。。。');
          console.error(err);
        }
      )
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }


  // test
  test(){
    const source$ = range(0, 10);
    source$.pipe(
      // filter(x => x % 2 === 0),
      // map(x => x + x),
      // scan((acc, x) => acc + x, 0)
      tap(
        x => x + x,
        err => console.error(err),
        () => console.log("Complete")
      )
    ).subscribe(
      x => console.log(x),
      err => console.error(err),
      () => console.log("Complete")
    )
  }


}

export class Account implements AdminsLoginDto{
  id: number;
  account: string;
  token: string;
  permissions: string;
  nickname: string;
  avatar: string;
}
