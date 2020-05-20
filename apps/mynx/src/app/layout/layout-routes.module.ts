import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { layoutRouters } from '../routes';


@NgModule({
  imports: [
    RouterModule.forChild(layoutRouters)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutesModule { }
