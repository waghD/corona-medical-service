import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorsService } from './doctors.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'profession'];
  doctorsTableDataSource = new MatTableDataSource<Doctor>();

  private dataSub: Subscription;
  constructor(private doctorService: DoctorsService) {}

  ngOnInit() {
    this.dataSub = this.doctorService.getDocs().subscribe((data: Doctor[]) => {
      this.doctorsTableDataSource.data = data;
    });
  }

  ngOnDestroy() {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
