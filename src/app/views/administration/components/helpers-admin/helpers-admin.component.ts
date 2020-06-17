import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { HelperDialogBoxComponent } from './dialog-box/helper-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { subscribeOn } from 'rxjs/operators';
import { Helper } from 'src/app/shared/models/helper.model';
;

@Component({
  selector: 'app-helpers-admin',
  templateUrl: './helpers-admin.component.html',
  styleUrls: ['./helpers-admin.component.css'],
})
export class HelpersAdminComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
  helpers: Helper[] = [];
  helpersTableDataSource = new MatTableDataSource<Helper>();
  

  constructor(
    private helperAdminService: AdministrationService,
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
    const dialogRef = this.dialog.open(HelperDialogBoxComponent, {
      width: '250px',
      data: obj,
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'neues Pflegepersonal') {
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
    this.helperAdminService.createHelper(row_obj).subscribe(() => {
      this.refresh();
    });
  }
  updateRowData(row_obj) {
    console.log('update');
    this.helperAdminService.editHelper(row_obj.id, row_obj).subscribe(() => {
      this.refresh();
    });
  }
  deleteRowData(row_obj) {
    this.helperAdminService.deleteHelper(row_obj.id).subscribe(() => {
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
      cleaner: null,
      doc: null,
      helper: this.helpers.find((helper) => helper.id === row_obj.id).toDto(),
      station: null,
    });

    this.helperAdminService.createShift(newShift).subscribe(() => {
      this.refresh();
    });
  }


  refresh() {
    this.helperAdminService.getHelpers().subscribe((data: Helper[]) => {
      console.log('refresh data');
      this.helpers = data;
      this.helpersTableDataSource.data = this.helpers;
      this.changeDetectorRefs.detectChanges();
    });
  }
}