import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Patient } from 'src/app/shared/models/patient.model';

@Injectable()
export class AdministrationService {
  private doctorStream: Subject<Doctor[]> = new BehaviorSubject<Doctor[]>([]);
  private cleanerStream: Subject<Cleaner[]> = new BehaviorSubject<Cleaner[]>(
    []
  );
  private helperStream: Subject<Helper[]> = new BehaviorSubject<Helper[]>([]);
  private patientStream: Subject<Patient[]> = new BehaviorSubject<Patient[]>(
    []
  );

  constructor(private apiConnection: ApiConnectionService) {
    this.setup();
  }

  private setup() {
    this.apiConnection
      .getDoctors()
      .subscribe((data) => this.doctorStream.next(data));
    this.apiConnection
      .getHelpers()
      .subscribe((data) => this.helperStream.next(data));
    this.apiConnection
      .getCleaners()
      .subscribe((data) => this.cleanerStream.next(data));
    this.apiConnection
      .getPatients()
      .subscribe((data) => this.patientStream.next(data));
  }

  public getDoctors(): Observable<Doctor[]> {
    return this.doctorStream.asObservable();
  }

  public getCleaners(): Observable<Cleaner[]> {
    return this.cleanerStream.asObservable();
  }

  public getHelpers(): Observable<Helper[]> {
    return this.helperStream.asObservable();
  }

  public getPatients(): Observable<Patient[]> {
    return this.patientStream.asObservable();
  }

  public deleteDoc(id: string): Promise<void> {
    return this.apiConnection.deleteDoctor(id);
  }

  public deleteCleaner(id: string): Promise<void> {
    return this.apiConnection.deleteCleaner(id);
  }

  public deleteHelper(id: string): Promise<void> {
    return this.apiConnection.deleteHelper(id);
  }

  public deletePatient(id: string): Promise<void> {
    return this.apiConnection.deletePatient(id);
  }

  public editDoc(id: string, doc: Doctor): Promise<void> {
    return this.apiConnection.editDoctor(id, {
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
  }

  public editCleaner(id: string, cleaner: Cleaner): Promise<void> {
    return this.apiConnection.editCleaner(id, {
      name: cleaner.name,
      surname: cleaner.surname,
    });
  }

  public editHelper(id: string, helper: Helper): Promise<void> {
    return this.apiConnection.editHelper(id, {
      name: helper.name,
      surname: helper.surname,
    });
  }
  public editPatient(id: string, patient: Patient): Promise<void> {
    return this.apiConnection.editPatient(id, {
      name: patient.name,
      surname: patient.surname,
    });
  }

  public createDoc(doc: Doctor): Promise<void> {
    const newDoc = new Doctor({
      id: 'tempID',
      name: doc.name,
      profession: doc.profession,
      surname: doc.surname,
    });
    return this.apiConnection.createDoctor(newDoc);
  }

  public createCleaner(cleaner: Cleaner): Promise<void> {
    const newCleaner = new Cleaner({
      id: 'tempID',
      name: cleaner.name,
      surname: cleaner.surname,
    });
    return this.apiConnection.createCleaner(newCleaner);
  }

  public createHelper(helper: Helper): Promise<void> {
    const newHelper = new Helper({
      id: 'tempID',
      name: helper.name,
      surname: helper.surname,
    });
    return this.apiConnection.createHelper(newHelper);
  }

  public createPatient(patient: Patient): Promise<void> {
    const newPatient = new Patient({
      id: 'tempID',
      name: patient.name,
      surname: patient.surname,
      station: null,
    });
    return this.apiConnection.createPatient(newPatient);
  }

  public createShift(shift: Shift): Promise<void> {
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
