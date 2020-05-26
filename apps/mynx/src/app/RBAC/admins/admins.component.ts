import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { map } from 'rxjs/operators';


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
    this.findAll();
  }

  findAll(){
    this.adminsList = this.adminsService.findAll({ index: 1, size: 0 }).pipe(map(x => x.list));
    console.log( this.adminsList );
  }

}
