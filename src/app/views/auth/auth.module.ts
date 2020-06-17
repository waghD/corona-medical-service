import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DeniedComponent } from './denied/denied.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'denied', component: DeniedComponent },
];

@NgModule({
  declarations: [AuthComponent, DeniedComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
