import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Subscription } from 'rxjs';
import { OperationTypes, DialogData } from '../operations';

@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
})
export class DoctorAdminComponent implements OnInit, OnDestroy {
  operations = OperationTypes;

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

  openDialog(action: OperationTypes, doctor?: Doctor) {
    const dialogData: DialogData<Doctor> = {
      action,
      data: doctor,
    };
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData<Doctor | Shift>) => {
      if (result.action === OperationTypes.CREATE) {
        this.addRowData(result.data as Doctor);
      } else if (result.action === OperationTypes.UPDATE) {
        this.updateRowData(result.data as Doctor);
      } else if (result.action === OperationTypes.DELETE) {
        this.deleteRowData(result.data as Doctor);
      } else if (result.action === OperationTypes.ADD) {
        this.newShift(result.data as Shift);
      }
    });
  }

  addRowData(doctor: Doctor) {
    console.log('add row');
    console.log('row_obj: ', doctor);
    this.doctorAdminService.createDoc(doctor).then(() => {});
  }
  updateRowData(doctor: Doctor) {
    console.log('update');
    this.doctorAdminService.editDoc(doctor.id, doctor).then(() => {});
  }
  deleteRowData(doctor: Doctor) {
    this.doctorAdminService.deleteDoc(doctor.id).then(() => {});
  }

  newShift(shift: Shift) {
    this.doctorAdminService.createShift(shift).then(() => {});
  }
}
