import { Component, OnInit } from '@angular/core';
import { DoctorsService } from './doctors.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'profession'];
  doctors: Doctor[] = [];
  doctorsTableDataSource = new MatTableDataSource<Doctor>();
  
  constructor(private doctorService: DoctorsService) {}

  ngOnInit() {
    this.getDoctors();
  }
  getDoctors() {
    this.doctorService.getShifts().subscribe((data: Doctor[]) => {
      console.log(data);
      this.doctors = data;
      console.log('doctors:', this.doctors);
      this.doctorsTableDataSource.data = this.doctors;
    });
  }
}
