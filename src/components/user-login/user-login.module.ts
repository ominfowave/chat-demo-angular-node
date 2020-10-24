import { UserLoginComponent } from './user-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginRoutingModule } from './user-login-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserLoginRoutingModule,
    SharedModule
  ],
  declarations: [UserLoginComponent]
})
export class UserLoginModule { }
