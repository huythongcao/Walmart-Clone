import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  CanLoad,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     if (!this.authService.isAdmin()) {
  //       this.router.navigateByUrl('no-access')
  //       return false;
  //     }
  //   return true;
  // }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.isLoggedIn || !this.authService.isAdmin()) {
      this.router.navigateByUrl('no-access');
      return false;
    }
    return true;
  }
}
