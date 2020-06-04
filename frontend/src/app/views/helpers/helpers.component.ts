import { Component, OnInit } from '@angular/core';
import { HelpersService } from './helpers.service';
import { Helper } from 'src/app/shared/models/helper.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.css'],
})
export class HelpersComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname'];
  helpers: Helper[] = [];
  helpersTableDataSource = new MatTableDataSource<Helper>();
  constructor(private helpersService: HelpersService) {}

  ngOnInit() {
    this.getHelpers();
  }
  getHelpers() {
    this.helpersService.getHelpers().subscribe((data: Helper[]) => {
      console.log(data);
      this.helpers = data;
      console.log('helpers:', this.helpers);
      this.helpersTableDataSource.data = this.helpers;
    });
  }
}
