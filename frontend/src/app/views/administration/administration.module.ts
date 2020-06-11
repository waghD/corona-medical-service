import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrationService } from './administration.service';
import { DoctorAdminComponent } from './components/doctor-admin/doctor-admin.component';
import { PatientAdminComponent } from './components/patient-admin/patient-admin.component';
import { HelpersAdminComponent } from './components/helpers-admin/helpers-admin.component';
import { CleanersAdminComponent } from './components/cleaners-admin/cleaners-admin.component';

const routes: Routes = [{ path: '', component: AdministrationComponent }];

@NgModule({
  declarations: [
    AdministrationComponent,
    DoctorAdminComponent,
    PatientAdminComponent,
    HelpersAdminComponent,
    CleanersAdminComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [AdministrationService],
})
export class AdministrationModule {}
