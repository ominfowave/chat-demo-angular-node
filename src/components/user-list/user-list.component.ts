import { Router } from '@angular/router';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public userList: any;
  constructor(private dataService: DataServiceService, private router: Router) { }

  ngOnInit() {
    const loggedInDetails = JSON.parse(localStorage.getItem('login_details'));
    let json = {
      logged_user_socket_id: loggedInDetails._id
    }
    this.dataService.getUserList(json).subscribe((res) => {
      console.log(res)
      this.userList = res.body;
    })
  }
  moveToChat(user) {
    console.log(user)
    localStorage.setItem('reciever_details', JSON.stringify(user));
    this.router.navigateByUrl('/chat');
  }
}
