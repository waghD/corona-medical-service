import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor, DoctorDto } from '../models/doctor.model';
import { Patient, PatientDto } from '../models/patient.model';
import { map } from 'rxjs/operators';
import { Helper, HelperDto } from '../models/helper.model';
import { Cleaner, CleanerDto } from '../models/cleaner.model';
import { Station, StationDto } from '../models/station.model';
import { Shift, ShiftDto } from '../models/shift.model';
import { RecursivePartial } from '../models/partial.model';
import { AngularFirestore } from '@angular/fire/firestore';

interface UserData {
  email: string;
  userGroup: string;
  registrationDate: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  constructor(private firestore: AngularFirestore) {
    firestore.firestore.settings({
      ignoreUndefinedProperties: true,
    });
  }

  public getUserData(uid: string): Promise<UserData> {
    return this.firestore
      .collection('users')
      .doc(uid)
      .get()
      .toPromise()
      .then((data) => data.data() as UserData);
  }

  /**
   * Returns a stream of all Doctors
   *
   * @returns List of doctors
   */
  public getDoctors(): Observable<Doctor[]> {
    return this.firestore
      .collection<DoctorDto>('doctors')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            console.log(documentSnap);
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Doctor(dto);
          })
        )
      );
  }

  /**
   * Gets a single Doctor by his unique id
   * @param id Doctor Id
   *
   * @returns single doctor
   */
  public getDoctorById(id: string): Observable<Doctor> {
    return this.firestore
      .collection('doctors')
      .doc<DoctorDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Doctor(dto);
        })
      );
  }

  /**
   * Creates a new Doctor in Database.
   * @param doctor Doctor Object that should be created in Database. Has to be instance of Doctor class
   *
   * @returns newly created Doctor
   */
  public createDoctor(doctor: Doctor): Promise<void> {
    if (!(doctor instanceof Doctor)) {
      throw new Error('Parameter is not instance of Doctor class');
    }
    const dto = doctor.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('doctors').doc<DoctorDto>(id).set(dto);
  }

  /**
   * Updates a Doctor object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Doctor that should be updated
   * @param updatedDoctor Partial Doctor object only containing attributes that should be updated
   *
   * @returns The complete updated Doctor object
   */
  public editDoctor(
    id: string,
    updatedDoctor: RecursivePartial<Doctor>
  ): Promise<void> {
    const dto = Doctor.partialToDto(updatedDoctor);
    return this.firestore
      .collection('doctors')
      .doc<RecursivePartial<Doctor>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Doctor from Database.
   * @param id Identifier of Doctor to delete
   *
   * @returns deleted Doctor object
   */
  public deleteDoctor(id: string): Promise<void> {
    return this.firestore.collection('doctors').doc(id).delete();
  }

  /**
   * Gets a list of all Helpers
   *
   * @returns List of Helpers
   */
  public getHelpers(): Observable<Helper[]> {
    return this.firestore
      .collection<HelperDto>('helpers')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Helper(dto);
          })
        )
      );
  }

  /**
   * Gets a single Helper by his unique id
   * @param id Helper Id
   *
   * @returns single Helper
   */
  public getHelperById(id: string): Observable<Helper> {
    return this.firestore
      .collection('helpers')
      .doc<HelperDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Helper(dto);
        })
      );
  }

  /**
   * Creates a new Helper in Database.
   * @param helper Helper Object that should be created in Database. Has to be instance of Helper class
   *
   * @returns newly created Helper
   */
  public createHelper(helper: Helper): Promise<void> {
    if (!(helper instanceof Helper)) {
      throw new Error('Parameter is not instance of Helper class');
    }
    const dto = helper.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('helpers').doc<HelperDto>(id).set(dto);
  }

  /**
   * Updates a Helper object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Helper that should be updated
   * @param updatedHelper Partial Helper object only containing the attributes that should be updated
   *
   * @returns The complete updated Helper object
   */
  public editHelper(
    id: string,
    updatedHelper: RecursivePartial<Helper>
  ): Promise<void> {
    const dto = Helper.partialToDto(updatedHelper);
    return this.firestore
      .collection('helpers')
      .doc<RecursivePartial<Helper>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Helper from Database.
   * @param id Identifier of Helper to delete
   *
   * @returns deleted Helper object
   */
  public deleteHelper(id: string): Promise<void> {
    return this.firestore.collection('helpers').doc(id).delete();
  }

  /**
   * Gets a list of all Cleaners
   *
   * @returns List of Cleaners
   */
  public getCleaners(): Observable<Cleaner[]> {
    return this.firestore
      .collection<CleanerDto>('cleaners')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Cleaner(dto);
          })
        )
      );
  }

  /**
   * Gets a single Cleaner by his unique id
   * @param id Cleaner Id
   *
   * @returns single Cleaner
   */
  public getCleanerById(id: string): Observable<Cleaner> {
    return this.firestore
      .collection('cleaners')
      .doc<CleanerDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Cleaner(dto);
        })
      );
  }

  /**
   * Creates a new Cleaner in Database.
   * @param cleaner Cleaner Object that should be created in Database. Has to be instance of Cleaner class
   *
   * @returns newly created Cleaner
   */
  public createCleaner(cleaner: Cleaner): Promise<void> {
    if (!(cleaner instanceof Cleaner)) {
      throw new Error('Given parameter is not instance of Cleaner class');
    }
    const dto = cleaner.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('cleaners').doc<CleanerDto>(id).set(dto);
  }

  /**
   * Updates a Cleaner object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Cleaner that should be updated
   * @param updatedCleaner Partial Cleaner object only containing the attributes that should be updated
   *
   * @returns The complete updated Cleaner object
   */
  public editCleaner(
    id: string,
    updatedCleaner: RecursivePartial<Cleaner>
  ): Promise<void> {
    const dto = Helper.partialToDto(updatedCleaner);
    return this.firestore
      .collection('cleaners')
      .doc<RecursivePartial<Cleaner>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Cleaner from Database.
   * @param id Identifier of Cleaner to delete
   *
   * @returns deleted Cleaner object
   */
  public deleteCleaner(id: string): Promise<void> {
    return this.firestore.collection('cleaners').doc(id).delete();
  }

  /**
   * Gets a list of all Patients
   *
   * @returns List of Patients
   */
  public getPatients(): Observable<Patient[]> {
    return this.firestore
      .collection<PatientDto>('patients')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Patient(dto);
          })
        )
      );
  }

  /**
   * Gets a single Patient by his unique id
   * @param id Patient Id
   *
   * @returns single Patient
   */
  public getPatientById(id: string): Observable<Patient> {
    return this.firestore
      .collection('patients')
      .doc<PatientDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Patient(dto);
        })
      );
  }

  /**
   * Creates a new Patient in Database.
   * @param patient Patient Object that should be created in Database. Has to be instance of Patient class
   *
   * @returns newly created Patient
   */
  public createPatient(patient: Patient): Promise<void> {
    if (!(patient instanceof Patient)) {
      throw new Error('Parameter is not instance of Patient class');
    }
    const dto = patient.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('patients').doc<PatientDto>(id).set(dto);
  }

  /**
   * Updates a Patient object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Patient that should be updated
   * @param updatedPatient Partial Patient object only containing the attributes that should be updated
   *
   * @returns The complete updated Patient object
   */
  public editPatient(
    id: string,
    updatedPatient: RecursivePartial<Patient>
  ): Promise<void> {
    const dto = Patient.partialToDto(updatedPatient);
    return this.firestore
      .collection('patients')
      .doc<RecursivePartial<Patient>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Patient from Database.
   * @param id Identifier of Patient to delete
   *
   * @returns deleted Patient object
   */
  public deletePatient(id: string): Promise<void> {
    return this.firestore.collection('patients').doc(id).delete();
  }

  /**
   * Gets a list of all Stations
   *
   * @returns List of Stations
   */
  public getStations(): Observable<Station[]> {
    return this.firestore
      .collection<StationDto>('stations')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Station(dto);
          })
        )
      );
  }

  /**
   * Gets a single Station by his unique id
   * @param id Station Id
   *
   * @returns single Station
   */
  public getStationById(id: string): Observable<Station> {
    return this.firestore
      .collection('stations')
      .doc<StationDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Station(dto);
        })
      );
  }

  /**
   * Creates a new Station in Database.
   * @param station Station Object that should be created in Database. This has to be a class instance of Station
   *
   * @returns newly created Station
   */
  public createStation(station: Station): Promise<void> {
    if (!(station instanceof Station)) {
      throw new Error('Parameter is not instance of class Station');
    }
    const dto = station.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('stations').doc<StationDto>(id).set(dto);
  }

  /**
   * Updates a Station object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Station that should be updated
   * @param updatedStation Partial Station object only containing the attributes that should be updated
   *
   * @returns The complete updated Station object
   */
  public editStation(
    id: string,
    updatedStation: RecursivePartial<Station>
  ): Promise<void> {
    const dto = Helper.partialToDto(updatedStation);
    return this.firestore
      .collection('stations')
      .doc<RecursivePartial<Station>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Station from Database.
   * @param id Identifier of Station to delete
   *
   * @returns deleted Station object
   */
  public deleteStation(id: string): Promise<void> {
    return this.firestore.collection('stations').doc(id).delete();
  }

  /**
   * Gets a list of all Shifts
   *
   * @returns List of Shifts
   */
  public getShifts(): Observable<Shift[]> {
    return this.firestore
      .collection<ShiftDto>('shifts')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((documentSnap) => {
            const dto = documentSnap.payload.doc.data();
            dto.id = documentSnap.payload.doc.id;
            return new Shift(dto);
          })
        )
      );
  }

  /**
   * Gets a single Shift by his unique id
   * @param id Shift Id
   *
   * @returns single Shift
   */
  public getShiftById(id: string): Observable<Shift> {
    return this.firestore
      .collection('shifts')
      .doc<ShiftDto>(id)
      .snapshotChanges()
      .pipe(
        map((documentSnap) => {
          const dto = documentSnap.payload.data();
          dto.id = documentSnap.payload.id;
          return new Shift(dto);
        })
      );
  }

  /**
   * Creates a new Shift in Database.
   * @param shift Shift Object that should be created in Database. Has to be instance of Shift class
   *
   * @returns newly created Shift
   */
  public createShift(shift: Shift): Promise<void> {
    if (!(shift instanceof Shift)) {
      throw new Error('Parameter is not instance of Shift class');
    }
    const dto = shift.toDto();
    const id = this.firestore.createId();
    dto.id = id;
    return this.firestore.collection('shifts').doc<ShiftDto>(id).set(dto);
  }

  /**
   * Updates a Shift object in Database.
   * Only changed attributes have to be provided.
   *
   * @param id Identifier of Shift that should be updated
   * @param updatedShift Partial Shift object only containing the attributes that should be updated
   *
   * @returns The complete updated Shift object
   */
  public editShift(
    id: string,
    updatedShift: RecursivePartial<Shift>
  ): Promise<void> {
    const dto = Helper.partialToDto(updatedShift);
    return this.firestore
      .collection('shifts')
      .doc<RecursivePartial<Shift>>(id)
      .set(dto, { merge: true });
  }

  /**
   * Deletes a Shift from Database.
   * @param id Identifier of Shift to delete
   *
   * @returns deleted Shift object
   */
  public deleteShift(id: string): Promise<void> {
    return this.firestore.collection('shifts').doc(id).delete();
  }
}
