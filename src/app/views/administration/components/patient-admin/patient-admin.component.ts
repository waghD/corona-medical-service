import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { PatientDialogBoxComponent } from './dialog-box/patient-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { subscribeOn } from 'rxjs/operators';
import { Patient } from 'src/app/shared/models/patient.model';


@Component({
  selector: 'app-patient-admin',
  templateUrl: './patient-admin.component.html',
  styleUrls: ['./patient-admin.component.css'],
})
export class PatientAdminComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
  patients: Patient[] = [];
  patientsTableDataSource = new MatTableDataSource<Patient>();
  

  constructor(
    private patientAdminService: AdministrationService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.refresh();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(PatientDialogBoxComponent, {
      width: '250px',
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
    this.patientAdminService.createPatient(row_obj).subscribe(() => {
      this.refresh();
    });
  }
  updateRowData(row_obj) {
    console.log('update');
    this.patientAdminService.editPatient(row_obj.id, row_obj).subscribe(() => {
      this.refresh();
    });
  }
  deleteRowData(row_obj) {
    this.patientAdminService.deletePatient(row_obj.id).subscribe(() => {
      this.refresh();
    });
  }
 
  refresh() {
    this.patientAdminService.getPatients().subscribe((data: Patient[]) => {
      console.log('refresh data');
      this.patients = data;
      this.patientsTableDataSource.data = this.patients;
      this.changeDetectorRefs.detectChanges();
    });
  }
}