import { Injectable } from '@angular/core';

import { Observable, range } from 'rxjs';
import { retry, tap } from 'rxjs/operators';
import { LoginAccount } from '@my-nx/api-interfaces';
import { HttpService } from '../share/services/http.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpService,
  ) {}

  isLoggedIn = false;
  redirectUrl: string;


  login(account: Account): Observable<Account> {
    return this.http.post<Account>('/api/auth/login', account).pipe(
      // retry(3),
      tap(val => this.isLoggedIn = true)
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

export class Account implements LoginAccount{
  id: number;
  password: string;
  token: string;
  username: string;
}
