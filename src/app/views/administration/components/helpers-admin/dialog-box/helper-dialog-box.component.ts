//dialog-box.component.ts
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationTypes, DialogData } from '../../operations';
import { Helper } from 'src/app/shared/models/helper.model';
import { Observable } from 'rxjs';
import { Station } from 'src/app/shared/models/station.model';
import { AdministrationService } from '../../../administration.service';
import { tap } from 'rxjs/operators';
import { Shift } from 'src/app/shared/models/shift.model';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './helper-dialog-box.component.html',
  styleUrls: ['./helper-dialog-box.component.css'],
})
export class HelperDialogBoxComponent {
  operations = OperationTypes;
  action: OperationTypes;
  helper: Helper;

  dateSelection: Date;

  actionTitle: string;

  stations: Observable<Station[]>;
  cachedStation: Station[];
  selectedStation: string;

  constructor(
    public dialogRef: MatDialogRef<HelperDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData<Helper>,
    private adminService: AdministrationService
  ) {
    console.log(data);
    if (data.data) {
      this.helper = data.data;
    } else {
      this.helper = new Helper({
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
        this.actionTitle = 'Neuer Pfleger';
        break;
      case OperationTypes.UPDATE:
        this.actionTitle = 'Pfleger bearbeiten';
        break;
      case OperationTypes.DELETE:
        this.actionTitle = 'Pfleger löschen';
        break;
      case OperationTypes.ADD:
        this.actionTitle = 'Neue Schicht';
        break;
      default:
        this.actionTitle = 'Pfleger';
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
        helper: this.helper,
        station: this.cachedStation.find(
          (station) => station.id === this.selectedStation
        ),
      });
      this.dialogRef.close({ action: this.action, data: shift });
    } else {
      this.dialogRef.close({ action: this.action, data: this.helper });
    }
  }

  closeDialog() {
    this.dialogRef.close({ action: OperationTypes.CANCEL });
  }
}
