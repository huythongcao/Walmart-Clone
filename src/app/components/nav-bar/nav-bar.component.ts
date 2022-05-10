import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  show = false;
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onToggle() {
    this.show = !this.show;
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
    this.show = false;
  }
  goToMyProfile() {
    this.router.navigateByUrl('/my-profile');
    this.show = false;
  }
}
