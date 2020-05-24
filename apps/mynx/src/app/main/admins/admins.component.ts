import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'my-nx-users',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  constructor(
    private adminsService: AdminsService
  ) {

  }

  isLoading = false;
  adminsList = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.getAdminList();
  }

  getAdminList(){
    this.adminsService.getList().subscribe(
      () => {
        this.adminsList = this.adminsService.adminList;
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

}
