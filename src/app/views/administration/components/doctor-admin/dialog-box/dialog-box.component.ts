//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, OperationTypes } from '../../operations';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { AdministrationService } from '../../../administration.service';
import { Observable } from 'rxjs';
import { Station } from 'src/app/shared/models/station.model';
import { tap } from 'rxjs/operators';
import { Shift } from 'src/app/shared/models/shift.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent {
  operations = OperationTypes;

  action: OperationTypes;
  doctor: Doctor;

  dateSelection: Date;

  actionTitle: string;

  stations: Observable<Station[]>;
  cachedStation: Station[];
  selectedStation: string;

  constructor(
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) private data: DialogData<Doctor>,
    private adminService: AdministrationService
  ) {
    console.log(data);
    if (data.data) {
      this.doctor = data.data;
    } else {
      this.doctor = new Doctor({
        id: 'temp',
        name: '',
        profession: '',
        surname: '',
      });
    }
    this.action = this.data.action;
    this.stations = this.adminService
      .getStations()
      .pipe(tap((data) => (this.cachedStation = data)));
    switch (this.action) {
      case OperationTypes.CREATE:
        this.actionTitle = 'Neuer Doctor';
        break;
      case OperationTypes.UPDATE:
        this.actionTitle = 'Doctor bearbeiten';
        break;
      case OperationTypes.DELETE:
        this.actionTitle = 'Doctor löschen';
        break;
      case OperationTypes.ADD:
        this.actionTitle = 'Neue Schicht';
        break;
      default:
        this.actionTitle = 'Doctor';
        break;
    }
  }

  doAction() {
    if (this.action === OperationTypes.ADD) {
      const shift: Shift = new Shift({
        from: new Date(
          this.dateSelection.getFullYear(),
          this.dateSelection.getMonth(),
          this.dateSelection.getDate(),
          6
        ).toISOString(),
        to: new Date(
          this.dateSelection.getFullYear(),
          this.dateSelection.getMonth(),
          this.dateSelection.getDate() + 1,
          6
        ).toISOString(),
        id: 'temp',
        doc: this.doctor,
        station: this.cachedStation.find(
          (station) => station.id === this.selectedStation
        ),
      });
      this.dialogRef.close({ action: this.action, data: shift });
    } else {
      this.dialogRef.close({ action: this.action, data: this.doctor });
    }
  }

  closeDialog() {
    this.dialogRef.close({ action: OperationTypes.CANCEL });
  }
}
