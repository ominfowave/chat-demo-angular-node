import { Router } from '@angular/router';
import { DataServiceService } from './../../services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public userLoginForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataServiceService, private router: Router) { }

  ngOnInit() {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  userLogin() {
    let json = {};
    json['username'] = this.userLoginForm.controls.email.value;
    json['password'] = this.userLoginForm.controls.password.value;
    this.dataService.authenticateUser(json).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/userlist');
      localStorage.setItem('login_details', JSON.stringify(res.body));
    })
    console.log(this.userLoginForm);
  }
}
