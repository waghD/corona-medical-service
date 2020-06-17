import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Patient } from 'src/app/shared/models/patient.model';

@Injectable()
export class AdministrationService {
  constructor(private apiConnection: ApiConnectionService) {}

  public getDoctors(): Observable<Doctor[]> {
    return this.apiConnection.getDoctors();
  }

  public getCleaners(): Observable<Cleaner[]> {
    return this.apiConnection.getCleaners();
  }

  public getHelpers(): Observable<Helper[]> {
    return this.apiConnection.getHelpers();
  }

  public getPatients(): Observable<Patient[]> {
    return this.apiConnection.getPatients();
  }

  public deleteDoc(id: string) {
    return this.apiConnection.deleteDoctor(id);
  }

  public deleteCleaner(id: string) {
    return this.apiConnection.deleteCleaner(id);
  }

  public deleteHelper(id: string) {
    return this.apiConnection.deleteHelper(id);
  }

  public deletePatient(id: string) {
    return this.apiConnection.deletePatient(id);
  }

  public editDoc(id: string, doc: Doctor) {
    return this.apiConnection.editDoctor(id, {
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
  }

  public editCleaner(id: string, cleaner: Cleaner) {
    return this.apiConnection.editCleaner(id, {
      name: cleaner.name,
      surname: cleaner.surname,
    });
  }

  public editHelper(id: string, helper: Helper) {
    return this.apiConnection.editHelper(id, {
      name: helper.name,
      surname: helper.surname,
    });
  }
  public editPatient(id: string, patient: Patient) {
    return this.apiConnection.editPatient(id, {
      name: patient.name,
      surname: patient.surname,
    });
  }

  public createDoc(doc: Doctor) {
    const newDoc = new Doctor({
      id: 'tempID',
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
    return this.apiConnection.createDoctor(newDoc);
  }

  public createCleaner(cleaner: Cleaner) {
    const newCleaner = new Cleaner({
      id: 'tempID',
      name: cleaner.name,
      surname: cleaner.surname,
    });
    return this.apiConnection.createCleaner(newCleaner);
  }

  public createHelper(helper: Helper) {
    const newHelper = new Helper({
      id: 'tempID',
      name: helper.name,
      surname: helper.surname,
    });
    return this.apiConnection.createHelper(newHelper);
  }

  // offen: Station Auswahl beim Anlegen in Dialog
  public createPatient(patient: Patient) {
    const newPatient = new Patient({
      id: 'tempID',
      name: patient.name,
      surname: patient.surname,
      station: null,
    });
    return this.apiConnection.createPatient(newPatient);
  }

  public createShift(shift: Shift) {
    var toDate = new Date();

    toDate.setDate(shift.from.getDate() + 1);
    console.log('from: ', shift.from);
    console.log('toDate: ', toDate);

    const newShift = new Shift({
      id: 'tempID',
      from: shift.from.toISOString(),

      to: toDate.toISOString(),

      cleaner: shift.cleaner,
      doc: shift.doc,
      helper: shift.helper,
      station: shift.station,
    });
    console.log('newShift: ', newShift);
    return this.apiConnection.createShift(newShift);
  }
}
