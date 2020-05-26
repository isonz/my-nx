import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    // const url = `/${route.path}`;
    const url = location.pathname;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // console.log(this.authService.isLoggedIn, this.authService.account.token);
    if (this.authService.isLoggedIn || this.authService.account.token) {
      return true;
    }

    this.authService.redirectUrl = url;
    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      // queryParams: { 'session_id': 'sessionId' },
      //fragment: 'anchor'
    };
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login'], navigationExtras);
    return false;
  }



}
