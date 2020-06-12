import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorAdminService {
  constructor(private apiConnection: ApiConnectionService) {
  }

  public getShifts(): Observable<Doctor[]> {
    const doctors = this.apiConnection.getDoctors();
    return doctors;
  }

  public deleteDoc(id:number) {
     this.apiConnection.deleteDoctor(id).subscribe((doc) => {
      console.log('Deleted Doctor: ', doc);
    });
  }

  public editDoc(id:number, doc:Doctor) {
    this.apiConnection.editDoctor(id, {
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,

    })
    .subscribe((updateDoc) => {
      console.log('Updated Doc: ', updateDoc);
    });
 }

 public createDoc(doc:Doctor) {
  const newDoc = new Doctor({
    id: 9,
    name: doc.name,
    profession: doc.profession,
    surname: doc.surname,
  });
  this.apiConnection.createDoctor(newDoc).subscribe((doc) => {
    console.log('Created Doctor: ', doc);
  });


  
}
}
