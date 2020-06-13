import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { CleanerDialogBoxComponent } from './dialog-box/cleaner-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { subscribeOn } from 'rxjs/operators';
import { Cleaner } from 'src/app/shared/models/cleaner.model';

@Component({
  selector: 'app-cleaners-admin',
  templateUrl: './cleaners-admin.component.html',
  styleUrls: ['./cleaners-admin.component.css'],
})
export class CleanersAdminComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
  cleaners: Cleaner[] = [];
  cleanersTableDataSource = new MatTableDataSource<Cleaner>();
  

  constructor(
    private cleanerAdminService: AdministrationService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.refresh();
    // refresh funzt leider noch nicht wie es soll
    // Lösungsidee: Redirect zur Homepage?
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CleanerDialogBoxComponent, {
      width: '250px',
      data: obj,
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'neue Reinigung') {
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
    this.cleanerAdminService.createCleaner(row_obj).subscribe(() => {
      this.refresh();
    });
  }
  updateRowData(row_obj) {
    console.log('update');
    this.cleanerAdminService.editCleaner(row_obj.id, row_obj).subscribe(() => {
      this.refresh();
    });
  }
  deleteRowData(row_obj) {
    this.cleanerAdminService.deleteCleaner(row_obj.id).subscribe(() => {
      this.refresh();
    });
  }

  newShift(row_obj) {
    console.log('neue Schicht am: ', row_obj.Date);
    console.log('neue Schicht von: ', row_obj.id);
    const newShift = new Shift({
      id: -1,
      from: row_obj.Date.toISOString(),
      to: row_obj.Date.toISOString(),
      cleaner: this.cleaners.find((cleaner) => cleaner.id === row_obj.id).toDto(),
      doc: null,
      helper: null,
      station: null,
    });

    this.cleanerAdminService.createShift(newShift).subscribe(() => {
      this.refresh();
    });
  }


  refresh() {
    this.cleanerAdminService.getCleaners().subscribe((data: Cleaner[]) => {
      console.log('refresh data');
      this.cleaners = data;
      this.cleanersTableDataSource.data = this.cleaners;
      this.changeDetectorRefs.detectChanges();
    });
  }
}