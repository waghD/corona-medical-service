import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log('AuthGuard');
    return this.auth.isLoggedIn().pipe(
      tap((loggedIn) => {
        console.log('loggedIn: ', loggedIn);
        if (!loggedIn) {
          if (state.url.includes('denied')) {
            this.auth.redirectUrl = '/administration';
          } else {
            this.auth.redirectUrl = state.url;
          }
          this.router.navigateByUrl('/auth').catch((err) => console.error(err));
        }
      })
    );
  }
}
