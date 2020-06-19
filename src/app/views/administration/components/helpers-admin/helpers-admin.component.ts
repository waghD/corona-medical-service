import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { HelperDialogBoxComponent } from './dialog-box/helper-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-helpers-admin',
  templateUrl: './helpers-admin.component.html',
  styleUrls: ['./helpers-admin.component.css'],
})
export class HelpersAdminComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'actions'];
  helpers: Helper[] = [];
  helpersTableDataSource = new MatTableDataSource<Helper>();

  private dataSub: Subscription;

  constructor(
    private helperAdminService: AdministrationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSub = this.helperAdminService
      .getHelpers()
      .subscribe((data: Helper[]) => {
        this.helpers = data;
        this.helpersTableDataSource.data = this.helpers;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(HelperDialogBoxComponent, {
      width: '300px',
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
    this.helperAdminService.createHelper(row_obj).then(() => {});
  }
  updateRowData(row_obj) {
    console.log('update');
    this.helperAdminService.editHelper(row_obj.id, row_obj).then(() => {});
  }
  deleteRowData(row_obj) {
    this.helperAdminService.deleteHelper(row_obj.id).then(() => {});
  }

  newShift(row_obj) {
    console.log('neue Schicht am: ', row_obj.Date);
    console.log('neue Schicht von: ', row_obj.id);
    const newShift = new Shift({
      id: 'tempID',
      from: row_obj.Date.toISOString(),
      to: row_obj.Date.toISOString(),
      cleaner: null,
      doc: null,
      helper: this.helpers.find((helper) => helper.id === row_obj.id).toDto(),
      station: null,
    });

    this.helperAdminService.createShift(newShift).then(() => {});
  }
}
