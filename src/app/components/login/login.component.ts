import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //isLoggedIn: boolean;
  //userName: string;
  message: string;

  constructor(private service: LoginService) { }

  ngOnInit() {
    // this.isLoggedIn = this.service.isloggedIn;
    // this.userName = this.service.getUserName();

    if (this.service.isloggedIn) {
      this.message = `Welcome, ${this.service.getUserName()}`;
    } else {
      this.message = 'You as not logged in';
    }
  }

}
