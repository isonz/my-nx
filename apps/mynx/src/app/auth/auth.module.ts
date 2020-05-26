import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { LoginComponent }    from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AngularMaterialModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}
