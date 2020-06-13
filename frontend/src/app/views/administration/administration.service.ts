import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Patient } from 'src/app/shared/models/patient.model';
import { Station } from 'src/app/shared/models/station.model';

@Injectable()
export class AdministrationService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getShifts(): Observable<Doctor[]> {
    const doctors = this.apiConnection.getDoctors();
    return doctors;
  }

  public getCleaners(): Observable<Cleaner[]> {
    const cleaners = this.apiConnection.getCleaners();
    return cleaners;
  }

  public getHelpers(): Observable<Helper[]> {
    const helpers = this.apiConnection.getHelpers();
    return helpers;
  }

  public getPatients(): Observable<Patient[]> {
    const patients = this.apiConnection.getPatients();
    return patients;
  }

  public deleteDoc(id: number) {
    return this.apiConnection.deleteDoctor(id);
  }

  public deleteCleaner(id: number) {
    return this.apiConnection.deleteCleaner(id);
  }

  public deleteHelper(id: number) {
    return this.apiConnection.deleteHelper(id);
  }

  public deletePatient(id: number) {
    return this.apiConnection.deletePatient(id);
  }

  public editDoc(id: number, doc: Doctor) {
    return this.apiConnection.editDoctor(id, {
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
  }
  public editCleaner(id: number, cleaner: Cleaner) {
    return this.apiConnection.editCleaner(id, {
      name: cleaner.name,
      surname: cleaner.surname,
    });
  }
  public editHelper(id: number, helper: Helper) {
    return this.apiConnection.editHelper(id, {
      name: helper.name,
      surname: helper.surname,
    });
  }
  public editPatient(id: number, patient: Patient) {
    return this.apiConnection.editPatient(id, {
      name: patient.name,
      surname: patient.surname,
    });
  }

  public createDoc(doc: Doctor) {
    const newDoc = new Doctor({
      id: 9,
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
    return this.apiConnection.createDoctor(newDoc);
  }

  public createCleaner(cleaner: Cleaner) {
    const newCleaner = new Cleaner({
      id: 9,
      name: cleaner.name,
      surname: cleaner.surname,
    });
    return this.apiConnection.createCleaner(newCleaner);
  }

  public createHelper(helper: Helper) {
    const newHelper = new Helper({
      id: 9,
      name: helper.name,
      surname: helper.surname,
    });
    return this.apiConnection.createHelper(newHelper);
  }

  // offen: Station Auswahl beim Anlegen in Dialog
  public createPatient(patient: Patient) {
      const newPatient = new Patient({
        id: 9,
        name: patient.name,
        surname: patient.surname,   
        station: null,
      });
      return this.apiConnection.createPatient(newPatient);
    }
    

  

  public createShift(shift: Shift) {
    var toDate = shift.from;
    toDate.setDate( toDate.getDate() +1 );

    const newShift = new Shift({
      id: -1,
      from: shift.from.toISOString(),
  
      to: toDate.toISOString(),

      cleaner: shift.cleaner,
      doc: shift.doc,
      helper: shift.helper,
      station: shift.station
    });
    return this.apiConnection.createShift(newShift);
  }

  
}
