import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { PatientDialogBoxComponent } from './dialog-box/patient-dialog-box.component';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';
import { OperationTypes, DialogData } from '../operations';

@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit, OnDestroy {
  operations = OperationTypes;

  displayedColumns = ['id', 'name', 'surname', 'station', 'actions'];
  patients: Patient[] = [];
  patientsTableDataSource = new MatTableDataSource<Patient>();

  private dataSub: Subscription;

  constructor(
    private patientAdminService: AdministrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSub = this.patientAdminService
      .getPatients()
      .subscribe((data: Patient[]) => {
        this.patients = data;
        this.patientsTableDataSource.data = this.patients;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }

  openDialog(action: OperationTypes, obj?: Patient) {
    const dialogData: DialogData<Patient> = {
      action,
      data: obj,
    };
    const dialogRef = this.dialog.open(PatientDialogBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData<Patient>) => {
      if (result.action == OperationTypes.CREATE) {
        this.addRowData(result.data);
      } else if (result.action == OperationTypes.UPDATE) {
        this.updateRowData(result.data);
      } else if (result.action == OperationTypes.DELETE) {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(patient: Patient) {
    console.log('add row: ', patient);
    this.patientAdminService.createPatient(patient).then(() => {});
  }
  updateRowData(patient: Patient) {
    console.log('update: ', patient);
    this.patientAdminService.editPatient(patient.id, patient).then(() => {});
  }
  deleteRowData(patient: Patient) {
    this.patientAdminService.deletePatient(patient.id).then(() => {});
  }
}
