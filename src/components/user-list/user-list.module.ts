import { UserListComponent } from './user-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule
  ],
  declarations: [UserListComponent]
})
export class UserListModule { }
