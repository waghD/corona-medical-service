import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Doctor } from 'src/app/shared/models/doctor.model';

@Injectable()
export class DoctorsService {
  constructor(private apiConnection: ApiConnectionService) {
    this.apiConnection.getDoctors().subscribe((doctors) => {
      console.log('Doctors: ', doctors);
    });
    this.apiConnection.getDoctorById(1).subscribe((doctor) => {
      console.log('Doctor 1: ', doctor);
    });
    const newDoc = new Doctor({
      id: 9,
      name: 'Henry',
      profession: 'Hautarzt',
      surname: 'Mayer',
    });
    this.apiConnection.createDoctor(newDoc).subscribe((doc) => {
      console.log('Created Doctor: ', doc);
    });
    this.apiConnection
      .editDoctor(2, {
        profession: 'UpdatedProfession',
      })
      .subscribe((updateDoc) => {
        console.log('Updated Doc: ', updateDoc);
      });
  }
}
