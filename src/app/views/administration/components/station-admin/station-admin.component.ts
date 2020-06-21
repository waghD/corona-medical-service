import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/shared/models/station.model';
import { OperationTypes, DialogData } from '../operations';
import { StationDialogComponent } from './station-dialog/station-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AdministrationService } from '../../administration.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-station-admin',
  templateUrl: './station-admin.component.html',
  styleUrls: ['./station-admin.component.css'],
})
export class StationAdminComponent implements OnInit {
  // Hack to get Enum in HTML Template
  operations = OperationTypes;
  displayedColumns = ['id', 'name', 'surname', 'station', 'actions'];
  stations: Station[] = [];
  patientsTableDataSource = new MatTableDataSource<Station>();

  private dataSub: Subscription;

  constructor(
    private patientAdminService: AdministrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSub = this.patientAdminService
      .getStations()
      .subscribe((data: Station[]) => {
        this.stations = data;
        this.patientsTableDataSource.data = this.stations;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }

  openDialog(action: OperationTypes, element?: Station) {
    const dialogData: DialogData<Station> = {
      action,
      data: element,
    };
    const dialogRef = this.dialog.open(StationDialogComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData<Station>) => {
      if (result.action === OperationTypes.CREATE) {
        this.addRowData(result.data);
      } else if (result.action === OperationTypes.UPDATE) {
        this.updateRowData(result.data);
      } else if (result.action === OperationTypes.DELETE) {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(station: Station) {
    console.log('add row');
    this.patientAdminService.createStation(station).then(() => {});
  }
  updateRowData(station: Station) {
    console.log('update');
    this.patientAdminService.editStation(station.id, station).then(() => {});
  }
  deleteRowData(station: Station) {
    this.patientAdminService.deleteStation(station.id).then(() => {});
  }
}
