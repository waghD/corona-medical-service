import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { CleanerDialogBoxComponent } from './dialog-box/cleaner-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cleaners-admin',
  templateUrl: './cleaners-admin.component.html',
  styleUrls: ['./cleaners-admin.component.css'],
})
export class CleanersAdminComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
  cleaners: Cleaner[];
  cleanersTableDataSource = new MatTableDataSource<Cleaner>();

  private dataSub: Subscription;

  constructor(
    private cleanerAdminService: AdministrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSub = this.cleanerAdminService
      .getCleaners()
      .subscribe((data: Cleaner[]) => {
        this.cleaners = data;
        this.cleanersTableDataSource.data = data;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CleanerDialogBoxComponent, {
      width: '300px',
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
    this.cleanerAdminService.createCleaner(row_obj).then(() => {});
  }
  updateRowData(row_obj) {
    console.log('update');
    this.cleanerAdminService.editCleaner(row_obj.id, row_obj).then(() => {});
  }
  deleteRowData(row_obj) {
    this.cleanerAdminService.deleteCleaner(row_obj.id).then(() => {});
  }

  newShift(row_obj) {
    console.log('neue Schicht am: ', row_obj.Date);
    console.log('neue Schicht von: ', row_obj.id);
    const newShift = new Shift({
      id: 'tempID',
      from: row_obj.Date.toISOString(),
      to: row_obj.Date.toISOString(),
      cleaner: this.cleaners
        .find((cleaner) => cleaner.id === row_obj.id)
        .toDto(),
      doc: null,
      helper: null,
      station: null,
    });

    this.cleanerAdminService.createShift(newShift).then(() => {});
  }
}
