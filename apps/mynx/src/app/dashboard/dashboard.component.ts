import { Component, OnInit } from '@angular/core';
import { Message } from '@my-nx/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

}
