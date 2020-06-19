import { Component, OnInit, OnDestroy } from '@angular/core';
import { CleanersService } from './cleaners.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.css'],
})
export class CleanersComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname'];
  cleanersTableDataSource = new MatTableDataSource<Cleaner>();

  private dataSub: Subscription;
  constructor(private cleanerService: CleanersService) {}

  ngOnInit() {
    this.dataSub = this.cleanerService
      .getCleaners()
      .subscribe((data: Cleaner[]) => {
        this.cleanersTableDataSource.data = data;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
