import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  isloggedIn: boolean = false;

  getUserName() {
    return 'Darth Vader';
  }
}
