import { Component, OnInit, Optional, Inject } from '@angular/core';
import { OperationTypes, DialogData } from '../../operations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientDialogBoxComponent } from '../../patient-admin/dialog-box/patient-dialog-box.component';
import { Station } from 'src/app/shared/models/station.model';

@Component({
  selector: 'app-station-dialog',
  templateUrl: './station-dialog.component.html',
  styleUrls: ['./station-dialog.component.css'],
})
export class StationDialogComponent implements OnInit {
  action: OperationTypes;
  station: Station;

  actionLabel: string;

  stationName: string;

  operations = OperationTypes;

  constructor(
    private dialogRef: MatDialogRef<PatientDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) private data: DialogData<Station>
  ) {
    console.log(data);
    this.station = data.data;
    this.action = this.data.action;
    switch (this.action) {
      case OperationTypes.CREATE:
        this.actionLabel = 'Neue Station';
        break;
      case OperationTypes.UPDATE:
        this.actionLabel = 'Station bearbeiten';
        break;
      case OperationTypes.DELETE:
        this.actionLabel = 'Station löschen';
        break;
      default:
        this.actionLabel = 'Station';
        break;
    }
  }

  ngOnInit(): void {}

  doAction() {
    const station = new Station({ id: 'temp', station: this.stationName });
    this.dialogRef.close({ action: this.action, data: station });
  }

  closeDialog() {
    this.dialogRef.close({ action: OperationTypes.CANCEL, data: {} });
  }
}
