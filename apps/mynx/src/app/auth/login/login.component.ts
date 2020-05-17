import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Account, AuthService } from '../auth.service';

@Component({
  selector: 'my-nx-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  hide = true;
  isLoading = false;
  account = new Account();

  constructor(
    public authService: AuthService,
    public router: Router,
    private eleRef :ElementRef
  ) {
  }

  onSubmit() {
    //console.log(this.account);
    this.isLoading = true;
    this.login();
  }


  login() {
    this.authService.login(this.account).subscribe(() => {
      this.isLoading = false;
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/dashboard';
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        this.router.navigateByUrl(redirect, navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eleRef.nativeElement.querySelector('#username').focus();
    }, 500);
  }
}
