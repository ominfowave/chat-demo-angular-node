import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  public chatDetails: any;
  public socket: any;
  public chatForm: FormGroup;
  public receiverName: any;
  constructor(private dataService: DataServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.chatForm = this.fb.group({
      chatMessage: ['', Validators.required]
    })
    this.getSocketConnection();
    const idJson = {};
    idJson['receiver_id'] = JSON.parse(localStorage.getItem('reciever_details'))._id;
    idJson['sender_id'] = JSON.parse(localStorage.getItem('login_details'))._id;
    this.dataService.getChatDetails(idJson).subscribe((chat) => {
      console.log(chat)
      this.chatDetails = chat.body;
      this.getChatHistoryDetails();

      // this.getChatHistoryDetails();
    });
    this.receiverName = JSON.parse(localStorage.getItem('reciever_details')).username;
  }
  getSocketConnection() {
    this.socket = io('localhost:5000');
    console.log(this.socket)
    localStorage.setItem('socket_id', this.socket.id)
  }
  getChatHistoryDetails() {
    let messages = document.getElementById("messages");
    this.chatDetails.map(data => {
      let userName;
      const lielement = document.createElement('li');
      if (JSON.parse(localStorage.getItem('login_details'))._id === data.sender_id) {
        userName = 'you';
      } else {
        userName = data.sender_name;
      }
      lielement.innerHTML = userName + '-' + data.message;
      lielement.style.padding = '15px 30px';
      lielement.style.margin = '10px';
      lielement.style.textAlign = 'right';
      messages.appendChild(lielement);
      // messages
      //   .appendChild(span)
      //   .append("by " + userName + ": " + formatTimeAgo(data.createdAt));
    });
  }
  sendMessage() {
    console.log(this.socket)
    const chatJson = {};
    chatJson['message'] = this.chatForm.controls.chatMessage.value;
    chatJson['sender_id'] = JSON.parse(localStorage.getItem('login_details'))._id;
    chatJson['sender_name'] = JSON.parse(localStorage.getItem('login_details')).username;
    chatJson['receiver_name'] = JSON.parse(localStorage.getItem('reciever_details')).username;
    chatJson['receiver_id'] = JSON.parse(localStorage.getItem('reciever_details'))._id;
    this.socket.emit("chat message", chatJson);
    const element = document.createElement('li');
    element.innerHTML = 'You' + '-' + this.chatForm.controls.chatMessage.value;
    // element.style.background = 'white';
    element.style.padding = '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('messages').appendChild(element);
    this.chatForm.controls.chatMessage.setValue('');
    this.receiveMessage();

  }
  receiveMessage() {
    this.socket.on("received", data => {
      console.log('PPPPPPPPPPPPdddddddddddP', data)
      const element1 = document.createElement('li');
      element1.innerHTML = JSON.parse(localStorage.getItem('reciever_details')).username + '-' + data.message;
      // element1.style.background = 'white';
      element1.style.padding = '15px 30px';
      element1.style.margin = '10px';
      element1.style.textAlign = 'right';
      document.getElementById('messages').appendChild(element1);
      console.log("Hello bingo!");
    });
  }
}

