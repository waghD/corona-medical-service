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
import { PatientDialogBoxComponent } from './components/patient-admin/dialog-box/patient-dialog-box.component';
import { HelperDialogBoxComponent } from './components/helpers-admin/dialog-box/helper-dialog-box.component';
import { CleanerDialogBoxComponent } from './components/cleaners-admin/dialog-box/cleaner-dialog-box.component';
import { DialogBoxComponent } from './components/doctor-admin/dialog-box/dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StationAdminComponent } from './components/station-admin/station-admin.component';
import { StationDialogComponent } from './components/station-admin/station-dialog/station-dialog.component';

const routes: Routes = [{ path: '', component: AdministrationComponent }];

@NgModule({
  declarations: [
    AdministrationComponent,
    DoctorAdminComponent,
    DialogBoxComponent,
    PatientAdminComponent,
    PatientDialogBoxComponent,
    HelpersAdminComponent,
    HelperDialogBoxComponent,
    CleanersAdminComponent,
    CleanerDialogBoxComponent,
    StationAdminComponent,
    StationDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdministrationService],
})
export class AdministrationModule {}
