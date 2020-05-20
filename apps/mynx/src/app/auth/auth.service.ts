import { Injectable } from '@angular/core';

import { Observable, of, range } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminsLoginDto } from '@my-nx/api-interfaces';
import { HttpService } from '../share/services/http.service';
import { ToastService } from '../share/services/toast.service';
import { SettingService } from '../share/services/setting.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService,
    public toastService: ToastService,
    public settingService: SettingService
  ) {
    if (this.account.id && this.account.token) {
      this.isLoggedIn = true;
    }
    // console.log(!this._account, this.isLoggedIn);
  }

  private _account: Account = null;
  public isLoggedIn = false;
  public redirectUrl: string;

  private _key = 'Auth';

  get key(): string {
    return this._key;
  }

  /**
   * 登录
   * @returns {Observable<result<string>>}
   * @memberof AuthService
   */
  login(account: string, password: string): Observable<Account> {
    return this.http.post<Account>('/api/auth/login', {account, password}).pipe(
      tap(
        val => {
            if(val){
              this.account = val;
              this.isLoggedIn = true;
            }
            return false;
          },
        err => {
          this.toastService.open('网络出现错误，请稍后。。。');
          console.error(err);
        }
      )
    );
  }

  /**
   * 登出
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  logout(): Observable<boolean> {
    return of(true).pipe(
      tap(() => {
        this.removeLocal();
        this.removeSession();
        this.isLoggedIn = false;
      })
    )
  }

  get account(): Account {
    if(!this._account){
      const session = this.settingService.getSession(this.key);
      const local = this.settingService.getLocal(this.key);
      this._account = Object.assign(new Account(), session ? session : local);
      this.settingService.setSession(this.key, this._account);
    }
    return this._account;
  }

  set account(value:Account) {
    this._account = Object.assign(this._account ? this._account : new Account(), value);
    this.settingService.setSession(this.key, this._account);
    if (this._account.remember_me) this.settingService.setLocal(this.key, this._account);
  }

  removeLocal() {
    this.settingService.removeLocal(this._key);
  }

  removeSession() {
    this.settingService.removeSession(this._key);
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
  remember_me = true;
}
