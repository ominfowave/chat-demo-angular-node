import { ChatScreenComponent } from './chat-screen.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatScreenRoutingModule } from './chat-screen-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChatScreenRoutingModule,
    SharedModule
  ],
  declarations: [ChatScreenComponent]
})
export class ChatScreenModule { }
