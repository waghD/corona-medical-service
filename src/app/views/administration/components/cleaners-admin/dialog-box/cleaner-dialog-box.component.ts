//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, OperationTypes } from '../../operations';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { AdministrationService } from '../../../administration.service';
import { Observable } from 'rxjs';
import { Station } from 'src/app/shared/models/station.model';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { tap } from 'rxjs/operators';
import { Shift } from 'src/app/shared/models/shift.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './cleaner-dialog-box.component.html',
  styleUrls: ['./cleaner-dialog-box.component.css'],
})
export class CleanerDialogBoxComponent {
  operations = OperationTypes;
  action: OperationTypes;
  cleaner: Cleaner;

  dateSelection: Date;

  actionTitle: string;

  stations: Observable<Station[]>;
  cachedStation: Station[];
  selectedStation: string;

  constructor(
    public dialogRef: MatDialogRef<CleanerDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData<Cleaner>,
    private adminService: AdministrationService
  ) {
    console.log(data);
    if (data.data) {
      this.cleaner = data.data;
    } else {
      this.cleaner = new Cleaner({
        id: 'temp',
        name: '',
        surname: '',
      });
    }
    this.action = this.data.action;
    this.stations = this.adminService
      .getStations()
      .pipe(tap((data) => (this.cachedStation = data)));
    switch (this.action) {
      case OperationTypes.CREATE:
        this.actionTitle = 'Neue Putzkraft';
        break;
      case OperationTypes.UPDATE:
        this.actionTitle = 'Putzkraft bearbeiten';
        break;
      case OperationTypes.DELETE:
        this.actionTitle = 'Putzkraft löschen';
        break;
      case OperationTypes.ADD:
        this.actionTitle = 'Neue Schicht';
        break;
      default:
        this.actionTitle = 'Putzkraft';
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
        cleaner: this.cleaner,
        station: this.cachedStation.find(
          (station) => station.id === this.selectedStation
        ),
      });
      this.dialogRef.close({ action: this.action, data: shift });
    } else {
      this.dialogRef.close({ action: this.action, data: this.cleaner });
    }
  }

  closeDialog() {
    this.dialogRef.close({ action: OperationTypes.CANCEL });
  }
}
