import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('admin guard');
    return this.auth
      .isAdmin()
      .then((isAdmin) => {
        console.log('isAdmin: ', isAdmin);
        if (!isAdmin) {
          this.router
            .navigateByUrl('/auth/denied')
            .catch((err) => console.error(err));
        }
        return isAdmin;
      })
      .catch((err) => {
        console.error(err);
        this.router
          .navigateByUrl('/auth/denied')
          .catch((err) => console.error(err));
        return false;
      });
  }
}
