import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname'];
  patients: Patient[] = [];
  patientsTableDataSource = new MatTableDataSource<Patient>();
  constructor(private patientsService: PatientService) {}

  ngOnInit() {
    this.getPatients();
  }
  getPatients() {
    this.patientsService.getPatients().subscribe((data: Patient[]) => {
      console.log(data);
      this.patients = data;
      console.log('patients:', this.patients);
      this.patientsTableDataSource.data = this.patients;
    });
  }
}
