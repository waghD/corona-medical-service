import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DialogBoxComponent } from './views/administration/components/doctor-admin/dialog-box/dialog-box.component';
import { CleanerDialogBoxComponent } from './views/administration/components/cleaners-admin/dialog-box/cleaner-dialog-box.component';
import { HelperDialogBoxComponent } from './views/administration/components/helpers-admin/dialog-box/helper-dialog-box.component';
import { PatientDialogBoxComponent } from './views/administration/components/patient-admin/dialog-box/patient-dialog-box.component';

@NgModule({
  declarations: [AppComponent, DialogBoxComponent, CleanerDialogBoxComponent, HelperDialogBoxComponent, PatientDialogBoxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
