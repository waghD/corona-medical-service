import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

enum Routes {
  AUTH,
  HOME,
  PATIENT,
  DOCTORS,
  HELPERS,
  CLEANERS,
  PRESENCE_PLANNER,
  ADMINISTRATION,
  NONE,
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  activeRoute: Routes = Routes.NONE;

  // Hack for acces to Routes enum in HTML template
  routes = Routes;

  routesDisabled: boolean = true;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects.includes('auth')) {
          this.activeRoute = Routes.AUTH;
          this.routesDisabled = true;
          return;
        }
        this.routesDisabled = false;
        if (event.urlAfterRedirects.includes('home')) {
          this.activeRoute = Routes.HOME;
          return;
        }
        if (event.urlAfterRedirects.includes('patient')) {
          this.activeRoute = Routes.PATIENT;
          return;
        }
        if (event.urlAfterRedirects.includes('doctor')) {
          this.activeRoute = Routes.DOCTORS;
          return;
        }
        if (event.urlAfterRedirects.includes('helper')) {
          this.activeRoute = Routes.HELPERS;
          return;
        }
        if (event.urlAfterRedirects.includes('cleaner')) {
          this.activeRoute = Routes.CLEANERS;
          return;
        }
        if (event.urlAfterRedirects.includes('presence-planner')) {
          this.activeRoute = Routes.PRESENCE_PLANNER;
          return;
        }
        if (event.urlAfterRedirects.includes('administration')) {
          this.activeRoute = Routes.ADMINISTRATION;
          return;
        }
        this.activeRoute = Routes.NONE;
      });
  }

  ngOnInit(): void {}

  logout() {
    this.auth.logout().then(() => this.router.navigateByUrl('/'));
  }
}
