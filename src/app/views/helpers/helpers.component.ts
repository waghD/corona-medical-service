import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpersService } from './helpers.service';
import { Helper } from 'src/app/shared/models/helper.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.css'],
})
export class HelpersComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname'];
  helpersTableDataSource = new MatTableDataSource<Helper>();

  private dataSub: Subscription;

  constructor(private helpersService: HelpersService) {}

  ngOnInit() {
    this.dataSub = this.helpersService
      .getHelpers()
      .subscribe((data: Helper[]) => {
        this.helpersTableDataSource.data = data;
      });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
