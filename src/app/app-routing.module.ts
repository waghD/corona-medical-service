import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'presence-planner' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./views/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'cleaners',
    loadChildren: () =>
      import('./views/cleaners/cleaners.module').then((m) => m.CleanersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./views/doctors/doctors.module').then((m) => m.DoctorsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'helpers',
    loadChildren: () =>
      import('./views/helpers/helpers.module').then((m) => m.HelpersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./views/patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'presence-planner',
    loadChildren: () =>
      import('./views/presence-planner/presence-planner.module').then(
        (m) => m.PresencePlannerModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
