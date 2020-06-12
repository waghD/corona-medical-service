import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Observable } from 'rxjs';
import { Shift } from 'src/app/shared/models/shift.model';

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

public async createShift(shift:Shift){
  const doctors = await this.apiConnection.getDoctors().toPromise();
  const stations = await this.apiConnection.getStations().toPromise();
  const helpers = await this.apiConnection.getHelpers().toPromise();
  const cleaners = await this.apiConnection.getCleaners().toPromise();
  
  const newShift = new Shift({
    id: -1,
    from: shift.from.toISOString(),
    to: shift.from.toISOString(),

    cleaner: cleaners[0],
    // hier steh ich jetzt leider an, ich versteh nicht warum hier doc nicht passt..
    // zur Vereinfachung der Aufgabe würde ich vorschlagen, dass wir:
    //- nur Tageweise Schichten machen
    //- Schichten lassen sich nur erstellen, aber nicht löschen
    // dann sollte die Aufgabe bis Sonntag aufjedenfall schaffbar sein...
    doc: shift.doc,
    helper: helpers[0],
    station: stations[0],
  });
  const createRes = await this.apiConnection
    .createShift(newShift)
    .toPromise();
  console.log('Created Shift: ', createRes);

}


}
