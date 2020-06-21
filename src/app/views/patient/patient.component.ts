import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from './patient.service';
import { Patient } from 'src/app/shared/models/patient.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'surname', 'station'];
  patientsTableDataSource = new MatTableDataSource<Patient>();

  private dataSub: Subscription;

  constructor(private patientsService: PatientService) {}

  ngOnInit() {
    this.dataSub = this.patientsService
      .getPatients()
      .subscribe((data: Patient[]) => {
        this.patientsTableDataSource.data = data;
      });
  }

  ngOnDestroy(): void {
    if (!this.dataSub.closed) {
      this.dataSub.unsubscribe();
    }
  }
}
