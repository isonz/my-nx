import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { map } from 'rxjs/operators';
import { AdminsDto, QueryResultList } from '@my-nx/api-interfaces';


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
  entityResult: QueryResultList<AdminsDto>;

  ngOnInit(): void {
    this.isLoading = true;
    this.findAll();
  }

  findAll(){
    // this.adminsService.findAll({ index: 1, size: 30 }).pipe(map(x => x.list)).subscribe((x) => {
    this.adminsService.findAll({ index: 1, size: 30 }).subscribe((x) => {
      this.entityResult = x;
      // console.log(this.entityResult);
    });
  }

}
