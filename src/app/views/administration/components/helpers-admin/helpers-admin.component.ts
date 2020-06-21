import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { HelperDialogBoxComponent } from './dialog-box/helper-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Subscription } from 'rxjs';
import { DialogData, OperationTypes } from '../operations';
@Component({
  selector: 'app-helpers-admin',
  templateUrl: './helpers-admin.component.html',
  styleUrls: ['./helpers-admin.component.css'],
})
export class HelpersAdminComponent implements OnInit, OnDestroy {
  operations = OperationTypes;

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

  openDialog(action: OperationTypes, obj?: Helper) {
    const dialogData: DialogData<Helper> = {
      action,
      data: obj,
    };

    const dialogRef = this.dialog.open(HelperDialogBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData<Helper | Shift>) => {
      if (result.action === OperationTypes.CREATE) {
        this.addRowData(result.data as Helper);
      } else if (result.action === OperationTypes.UPDATE) {
        this.updateRowData(result.data as Helper);
      } else if (result.action === OperationTypes.DELETE) {
        this.deleteRowData(result.data as Helper);
      } else if (result.action === OperationTypes.ADD) {
        this.newShift(result.data as Shift);
      }
    });
  }

  addRowData(helper: Helper) {
    console.log('add row');
    this.helperAdminService.createHelper(helper).then(() => {});
  }
  updateRowData(helper: Helper) {
    console.log('update');
    this.helperAdminService.editHelper(helper.id, helper).then(() => {});
  }
  deleteRowData(helper: Helper) {
    this.helperAdminService.deleteHelper(helper.id).then(() => {});
  }

  newShift(shift: Shift) {
    console.log('Add shift: ', shift);
    this.helperAdminService.createShift(shift).then(() => {});
  }
}
