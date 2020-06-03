import { Component, OnInit } from '@angular/core';
import { PresencePlannerService } from './presence-planner.service';
import { MatTableDataSource } from '@angular/material/table';
import { Shift } from 'src/app/shared/models/shift.model';

@Component({
  selector: 'app-presence-planner',
  templateUrl: './presence-planner.component.html',
  styleUrls: ['./presence-planner.component.css'],
})
export class PresencePlannerComponent implements OnInit {
  displayedColumns = [
    'doc',
    'from',
    'to',
    'station',
 ];
  shifts:any = [];
  shiftsTableDataSource = new MatTableDataSource<Shift>();

  constructor(private precenseService: PresencePlannerService) {}

  ngOnInit() {
    this.getShifts();
  }
  getShifts() {
    //this.shifts = [];
    this.precenseService.getShifts().subscribe((data: {}) => {
      console.log(data);
      this.shifts = data as Shift[];
      console.log('converted shifts_:', this.shifts)
      this.shiftsTableDataSource.data = this.shifts;
    });
  }
}
