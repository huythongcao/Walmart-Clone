import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // hard code for dev purpose
  user = {
    email: 'janet.weaver@reqres.in',
    password: 'abc123',
  };
  // user = {
  //   email: '',
  //   password: '',
  // };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onLogin() {
    this.auth.login(this.user).subscribe((res) => {
      // console.log(res);
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

  log(value) {
    console.log(value);
  }


}
