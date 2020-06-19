import { Component, OnInit, OnDestroy } from '@angular/core';
import { PresencePlannerService } from './presence-planner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/shared/models/shift.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presence-planner',
  templateUrl: './presence-planner.component.html',
  styleUrls: ['./presence-planner.component.css'],
})
export class PresencePlannerComponent implements OnInit, OnDestroy {
  displayedColumns = ['doc', 'from', 'to', 'station'];
  shiftsTableDataSource = new MatTableDataSource<Shift>();

  private dataSub: Subscription;

  constructor(private precenseService: PresencePlannerService) {}

  ngOnInit() {
    this.dataSub = this.precenseService
      .getShifts()
      .subscribe((data: Shift[]) => {
        this.shiftsTableDataSource.data = data;
      });
  }

  ngOnDestroy(): void {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
