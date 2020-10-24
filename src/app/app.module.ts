import { UserListComponent } from './../components/user-list/user-list.component';
import { UserLoginComponent } from './../components/user-login/user-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../components/user-login/user-login.module').then(module => module.UserLoginModule)
  },
  {
    path: 'userlist',
    loadChildren: () => import('../components/user-list/user-list.module').then(module => module.UserListModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../components/chat-screen/chat-screen.module').then(module => module.ChatScreenModule)
  }
];
@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
