import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from './doctors.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: DoctorsComponent }];

@NgModule({
  declarations: [DoctorsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class DoctorsModule {}
