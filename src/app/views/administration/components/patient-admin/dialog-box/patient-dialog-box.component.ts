//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, OperationTypes } from '../../operations';
import { Patient } from 'src/app/shared/models/patient.model';
import { Observable } from 'rxjs';
import { Station } from 'src/app/shared/models/station.model';
import { AdministrationService } from '../../../administration.service';
import { tap } from 'rxjs/operators';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './patient-dialog-box.component.html',
  styleUrls: ['./patient-dialog-box.component.css'],
})
export class PatientDialogBoxComponent {
  operations = OperationTypes;
  action: OperationTypes;
  patient: Patient;

  stations: Observable<Station[]>;
  cachedStation: Station[];

  selectedStation: string;

  actionTitle: string;

  constructor(
    public dialogRef: MatDialogRef<PatientDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData<Patient>,
    private adminService: AdministrationService
  ) {
    console.log(data);
    if (data.data) {
      this.patient = data.data;
    } else {
      this.patient = new Patient({
        id: 'temp',
        name: '',
        surname: '',
      });
    }
    this.action = this.data.action;
    switch (this.action) {
      case OperationTypes.CREATE:
        this.actionTitle = 'Neuer Patient';
        break;
      case OperationTypes.UPDATE:
        this.actionTitle = 'Patient bearbeiten';
        break;
      case OperationTypes.DELETE:
        this.actionTitle = 'Patient löschen';
        break;
      default:
        this.actionTitle = 'Patient';
        break;
    }
    this.stations = this.adminService
      .getStations()
      .pipe(tap((data) => (this.cachedStation = data)));
    if (this.patient.station) {
      this.selectedStation = this.patient.station.id;
    }
  }

  doAction() {
    if (this.selectedStation) {
      this.patient.station = this.cachedStation.find(
        (station) => station.id === this.selectedStation
      );
    }
    console.log('patient: ', this.patient);
    this.dialogRef.close({ action: this.action, data: this.patient });
  }

  closeDialog() {
    this.dialogRef.close({ action: OperationTypes.CANCEL });
  }
}
