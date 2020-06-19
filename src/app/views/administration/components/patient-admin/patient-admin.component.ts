import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { PatientDialogBoxComponent } from './dialog-box/patient-dialog-box.component';
import { Patient } from 'src/app/shared/models/patient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
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

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PatientDialogBoxComponent, {
      width: '300px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'neuer Patient') {
        this.addRowData(result.data);
      } else if (result.event == 'bearbeiten') {
        this.updateRowData(result.data);
      } else if (result.event == 'löschen') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    console.log('add row');
    this.patientAdminService.createPatient(row_obj).then(() => {});
  }
  updateRowData(row_obj) {
    console.log('update');
    this.patientAdminService.editPatient(row_obj.id, row_obj).then(() => {});
  }
  deleteRowData(row_obj) {
    this.patientAdminService.deletePatient(row_obj.id).then(() => {});
  }
}
