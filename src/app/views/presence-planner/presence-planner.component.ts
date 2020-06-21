import { Component, OnInit, OnDestroy } from '@angular/core';
import { PresencePlannerService } from './presence-planner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/shared/models/shift.model';
import { Subscription } from 'rxjs';

enum FilterTypes {
  DOCTOR,
  HELPER,
  CLEANER,
}

@Component({
  selector: 'app-presence-planner',
  templateUrl: './presence-planner.component.html',
  styleUrls: ['./presence-planner.component.css'],
})
export class PresencePlannerComponent implements OnInit, OnDestroy {
  filters = FilterTypes;
  currentFilter: FilterTypes = FilterTypes.DOCTOR;

  personalLabel: string = 'Arzt';

  displayedColumns = ['doc', 'from', 'to', 'station'];
  shiftsTableDataSource = new MatTableDataSource<Shift>();

  shifts: Shift[];

  private dataSub: Subscription;

  constructor(private precenseService: PresencePlannerService) {}

  setFilter(type: FilterTypes) {
    this.currentFilter = type;
    switch (type) {
      case FilterTypes.DOCTOR:
        this.personalLabel = 'Arzt';
        break;
      case FilterTypes.HELPER:
        this.personalLabel = 'Pfleger';
        break;
      case FilterTypes.CLEANER:
        this.personalLabel = 'Reinigung';
        break;
    }
    const filteredShifts = this.shifts.filter((shift) => {
      switch (this.currentFilter) {
        case FilterTypes.DOCTOR: {
          return !!shift.doc;
        }
        case FilterTypes.CLEANER: {
          return !!shift.cleaner;
        }
        case FilterTypes.HELPER: {
          return !!shift.helper;
        }
      }
    });
    console.log('filtered Shifts: ', filteredShifts);
    this.shiftsTableDataSource.data = filteredShifts;
  }

  ngOnInit() {
    this.dataSub = this.precenseService
      .getShifts()
      .subscribe((data: Shift[]) => {
        this.shifts = data;
        const filteredShifts = this.shifts.filter((shift) => {
          switch (this.currentFilter) {
            case FilterTypes.DOCTOR: {
              return !!shift.doc;
            }
            case FilterTypes.CLEANER: {
              return !!shift.cleaner;
            }
            case FilterTypes.HELPER: {
              return !!shift.cleaner;
            }
          }
        });
        this.shiftsTableDataSource.data = filteredShifts;
      });
  }

  ngOnDestroy(): void {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
