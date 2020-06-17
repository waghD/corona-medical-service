import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientService } from './patient.service';

const routes: Routes = [{ path: '', component: PatientComponent }];

@NgModule({
  declarations: [PatientComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [PatientService],
})
export class PatientModule {}
