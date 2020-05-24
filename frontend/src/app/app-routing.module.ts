import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('./views/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'cleaners',
    loadChildren: () =>
      import('./views/cleaners/cleaners.module').then((m) => m.CleanersModule),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./views/doctors/doctors.module').then((m) => m.DoctorsModule),
  },
  {
    path: 'helpers',
    loadChildren: () =>
      import('./views/helpers/helpers.module').then((m) => m.HelpersModule),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./views/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'presence-planner',
    loadChildren: () =>
      import('./views/presence-planner/presence-planner.module').then(
        (m) => m.PresencePlannerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
