import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  entityLists = null;

  ngOnInit(): void {
    this.isLoading = true;
    this.findAll();
  }

  findAll(){
    this.adminsService.findAll({ index: 1, size: 30 }).pipe(map(x => x.list)).subscribe((x) => {
      this.entityLists = x;
      console.log(this.entityLists);
    });
  }

}
