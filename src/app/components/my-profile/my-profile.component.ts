import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from 'src/app/guards/can-component-deactivate.guard';
import { AuthService } from './../../services/auth.service';

interface User {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit, CanComponentDeactivate {
  user: User = {
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };

  originalUser: User;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUserProfile().subscribe((res: any) => {
      // console.log(res);
      this.user = {...this.originalUser};
      this.originalUser = {...res.data}
    });
  }

  canExit = () => {
    // let confirmation;
    if (JSON.stringify(this.user) !== JSON.stringify(this.originalUser)) {
      let result = confirm("You haven't save your editing yet, are you sure you want to navigate away?")
      return result;
    }
    return true;
  };

  onSave() {}
}
