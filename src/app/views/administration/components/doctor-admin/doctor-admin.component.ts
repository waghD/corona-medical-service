import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
})
export class DoctorAdminComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'profession', 'actions'];
  doctors: Doctor[] = [];
  doctorsTableDataSource = new MatTableDataSource<Doctor>();

  private dataSub: Subscription;

  constructor(
    private doctorAdminService: AdministrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSub = this.doctorAdminService
      .getDoctors()
      .subscribe((data: Doctor[]) => {
        this.doctors = data;
        this.doctorsTableDataSource.data = this.doctors;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'neuer Arzt') {
        this.addRowData(result.data);
      } else if (result.event == 'bearbeiten') {
        this.updateRowData(result.data);
      } else if (result.event == 'löschen') {
        this.deleteRowData(result.data);
      } else if (result.event == 'neue Schicht') {
        this.newShift(result.data);
      }
    });
  }

  addRowData(row_obj) {
    console.log('add row');
    console.log('row_obj: ', row_obj);
    this.doctorAdminService.createDoc(row_obj).then(() => {});
  }
  updateRowData(row_obj) {
    console.log('update');
    this.doctorAdminService.editDoc(row_obj.id, row_obj).then(() => {});
  }
  deleteRowData(row_obj) {
    this.doctorAdminService.deleteDoc(row_obj.id).then(() => {});
  }

  newShift(row_obj) {
    console.log('neue Schicht am: ', row_obj.Date);
    console.log('neue Schicht von: ', row_obj.id);
    const newShift = new Shift({
      id: 'tempID',
      from: row_obj.Date.toISOString(),
      to: row_obj.Date.toISOString(),
      cleaner: null,
      doc: this.doctors.find((doc) => doc.id === row_obj.id).toDto(),
      helper: null,
      station: null,
    });

    this.doctorAdminService.createShift(newShift).then(() => {});
  }
}
