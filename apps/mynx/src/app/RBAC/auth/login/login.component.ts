import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'my-nx-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  hide = true;
  isLoading = false;
  account = '';
  password = '';
  remember_me = false;

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
    this.authService.remember_me = this.remember_me;
    this.authService.login(this.account, this.password).subscribe(
      () => {
        if (this.authService.isLoggedIn) {
            const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/main';
            const navigationExtras: NavigationExtras = {
              queryParamsHandling: 'preserve',
              preserveFragment: true
            };
            this.router.navigateByUrl(redirect, navigationExtras);
        }else{
          this.eleRef.nativeElement.querySelector('#password').value = '';
          this.eleRef.nativeElement.querySelector('#password').focus();
        }
      },
      err => {
        this.isLoading = false;
        console.error(err);
      },
      () =>{
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.eleRef.nativeElement.querySelector('#account').focus();
    }, 500);
  }
}
