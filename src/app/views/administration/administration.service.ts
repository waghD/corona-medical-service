import { Injectable } from '@angular/core';
import { ApiConnectionService } from 'src/app/shared/services/api-connection.service';
import { Observable, Subscription, Subject, BehaviorSubject } from 'rxjs';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Shift } from 'src/app/shared/models/shift.model';
import { Cleaner } from 'src/app/shared/models/cleaner.model';
import { Helper } from 'src/app/shared/models/helper.model';
import { Patient } from 'src/app/shared/models/patient.model';
import { Station } from 'src/app/shared/models/station.model';

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
  private stationStream: Subject<Station[]> = new BehaviorSubject<Station[]>(
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
    this.apiConnection
      .getStations()
      .subscribe((data) => this.stationStream.next(data));
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

  public getStations(): Observable<Station[]> {
    return this.stationStream.asObservable();
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

  public deleteStation(id: string): Promise<void> {
    return this.apiConnection.deleteStation(id);
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
      station: patient.station,
    });
  }

  public editStation(id: string, station: Station): Promise<void> {
    return this.apiConnection.editStation(id, {
      station: station.station,
    });
  }

  public createDoc(doc: Doctor): Promise<void> {
    return this.apiConnection.createDoctor(doc);
  }

  public createCleaner(cleaner: Cleaner): Promise<void> {
    return this.apiConnection.createCleaner(cleaner);
  }

  public createHelper(helper: Helper): Promise<void> {
    return this.apiConnection.createHelper(helper);
  }

  public createPatient(patient: Patient): Promise<void> {
    return this.apiConnection.createPatient(patient);
  }

  public createStation(station: Station): Promise<void> {
    return this.apiConnection.createStation(station);
  }

  public createShift(shift: Shift): Promise<void> {
    return this.apiConnection.createShift(shift);
  }
}
