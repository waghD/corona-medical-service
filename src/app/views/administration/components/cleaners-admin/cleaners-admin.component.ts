import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdministrationService } from '../../administration.service';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { CleanerDialogBoxComponent } from './dialog-box/cleaner-dialog-box.component';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Subscription } from 'rxjs';
import { OperationTypes, DialogData } from '../operations';

@Component({
  selector: 'app-cleaners-admin',
  templateUrl: './cleaners-admin.component.html',
  styleUrls: ['./cleaners-admin.component.css'],
})
export class CleanersAdminComponent implements OnInit, OnDestroy {
  operations = OperationTypes;

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

  openDialog(action: OperationTypes, cleaner?: Cleaner) {
    const dialogData: DialogData<Cleaner> = {
      action,
      data: cleaner,
    };
    const dialogRef = this.dialog.open(CleanerDialogBoxComponent, {
      width: '300px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result: DialogData<Cleaner | Shift>) => {
      if (result.action === OperationTypes.CREATE) {
        this.addRowData(result.data as Cleaner);
      } else if (result.action === OperationTypes.UPDATE) {
        this.updateRowData(result.data as Cleaner);
      } else if (result.action === OperationTypes.DELETE) {
        this.deleteRowData(result.data as Cleaner);
      } else if (result.action === OperationTypes.ADD) {
        this.newShift(result.data as Shift);
      }
    });
  }

  addRowData(helper: Cleaner) {
    console.log('add row');
    this.cleanerAdminService.createCleaner(helper).then(() => {});
  }
  updateRowData(helper: Cleaner) {
    console.log('update');
    this.cleanerAdminService.editCleaner(helper.id, helper).then(() => {});
  }
  deleteRowData(helper: Cleaner) {
    this.cleanerAdminService.deleteCleaner(helper.id).then(() => {});
  }

  newShift(shift: Shift) {
    this.cleanerAdminService.createShift(shift).then(() => {});
  }
}
