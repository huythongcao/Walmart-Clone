import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  searchControl = new FormControl('');
  searchResults = [];
  showDropDown = false
  show = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private http: HttpClient,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((v: string) => v.trim()),
        tap((v: string) => {
          if (v === '') {
            this.showDropDown = false;
          }
        }),
        filter((v: string) => v !== ''),
        switchMap((v) =>
          this.http.get(
            `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=` +
              v
          )
        ),
        map((res: any) =>
          res[1].map((item, index) => {
            return { title: item, url: res[3][index] };
          })
        )
      )
      .subscribe((data) => {
        // console.log(value);
        this.searchResults = data
        this.showDropDown = true
      });
  }

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

  goToAdminPage() {
    this.show = false;
    this.router.navigateByUrl('/admin');
  }
}
