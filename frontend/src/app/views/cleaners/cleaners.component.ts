import { Component, OnInit } from '@angular/core';
import { CleanersService } from './cleaners.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cleaner } from 'src/app/shared/models/cleaner.model';

@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.css'],
})
export class CleanersComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname'];
  cleaners: Cleaner[] = [];
  cleanersTableDataSource = new MatTableDataSource<Cleaner>();
  constructor(private cleanerService: CleanersService) {}

  ngOnInit() {
    this.getCleaners();
  }
  getCleaners() {
    this.cleanerService.getCleaners().subscribe((data: Cleaner[]) => {
      console.log(data);
      this.cleaners = data;
      console.log('cleaners:', this.cleaners);
      this.cleanersTableDataSource.data = this.cleaners;
    });
  }
}
