import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { DoctorAdminService } from './doctor-admin.service';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogBoxComponent } from './dialog-box/dialog-box.component';


@Component({
  selector: 'app-doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css'],
  providers: [DoctorAdminService]
})
export class DoctorAdminComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'profession','actions'];
  doctors: Doctor[] = [];
  doctorsTableDataSource = new MatTableDataSource<Doctor>();
  
  constructor(private doctorAdminService: DoctorAdminService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.refresh();
    // refresh funzt leider noch nicht wie es soll
    // Lösungsidee: Redirect zur Homepage?
  }
  
  

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'neuer Arzt'){
        this.addRowData(result.data);
      }else if(result.event == 'bearbeiten'){
        this.updateRowData(result.data);
      }else if(result.event == 'löschen'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    console.log('add row');
    this.doctorAdminService.createDoc(row_obj);
    this.refresh();

  }
  updateRowData(row_obj){
    console.log('update');
    this.doctorAdminService.editDoc(row_obj.id,row_obj);
    this.refresh();
  }
  deleteRowData(row_obj){
    this.doctorAdminService.deleteDoc(row_obj.id);
    this.refresh();
  }

  refresh() {
    this.doctorAdminService.getShifts().subscribe((data: Doctor[]) => {
    console.log('refresh data');
    this.doctors = data;
    this.doctorsTableDataSource = new MatTableDataSource<Doctor>();
    this.doctorsTableDataSource.data = this.doctors;
    this.changeDetectorRefs.detectChanges();
    
    });


}
}