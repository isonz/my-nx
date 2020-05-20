import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-nx-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
  }

  action(type) {
    if (type === 'logout') {
      this.auth.logout().subscribe(x => {
        if (x) {
          this.auth.removeSession();
          this.auth.removeLocal();
          this.router.navigate(['/auth/login'])
        }
      });
    }
  }

}
