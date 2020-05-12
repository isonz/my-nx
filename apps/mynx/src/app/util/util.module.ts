import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilRoutingModule } from './util-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    UtilRoutingModule
  ]
})
export class UtilModule { }
