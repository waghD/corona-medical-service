import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, DoctorDto } from '../models/doctor.model';
import { environment } from 'src/environments/environment';
import { Patient, PatientDto } from '../models/patient.model';
import { map } from 'rxjs/operators';
import { Helper, HelperDto } from '../models/helper.model';
import { Cleaner, CleanerDto } from '../models/cleaner.model';
import { Station, StationDto } from '../models/station.model';
import { Shift, ShiftDto } from '../models/shift.model';
import { RecursivePartial } from '../models/partial.model';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectionService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets a list of all Doctors
   *
   * @returns List of doctors
   */
  public getDoctors(): Observable<Doctor[]> {
    return this.httpClient
      .get<DoctorDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/doctors`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Doctor(dto))));
  }

  /**
   * Gets a single Doctor by his unique id
   * @param id Doctor Id
   *
   * @returns single doctor
   */
  public getDoctorById(id: number): Observable<Doctor> {
    return this.httpClient
      .get<DoctorDto>(
        `${environment.apiHost}${environment.apiEndpoint}/doctors/${id}`
      )
      .pipe(map((dto) => new Doctor(dto)));
  }

  /**
   * Creates a new Doctor in Database.
   * @param doctor Doctor Object that should be created in Database. Has to be instance of Doctor class
   *
   * @returns newly created Doctor
   */
  public createDoctor(doctor: Doctor): Observable<Doctor> {
    if (!(doctor instanceof Doctor)) {
      throw new Error('Parameter is not instance of Doctor class');
    }
    return this.httpClient
      .put<DoctorDto>(
        `${environment.apiHost}${environment.apiEndpoint}/doctors`,
        doctor.toDto()
      )
      .pipe(map((dto) => new Doctor(dto)));
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
    id: number,
    updatedDoctor: RecursivePartial<Doctor>
  ): Observable<Doctor> {
    return this.httpClient
      .post<DoctorDto>(
        `${environment.apiHost}${environment.apiEndpoint}/doctors/${id}`,
        Doctor.partialToDto(updatedDoctor)
      )
      .pipe(map((dto) => new Doctor(dto)));
  }

  /**
   * Deletes a Doctor from Database.
   * @param id Identifier of Doctor to delete
   *
   * @returns deleted Doctor object
   */
  public deleteDoctor(id: number): Observable<Doctor> {
    return this.httpClient
      .delete<DoctorDto>(
        `${environment.apiHost}${environment.apiEndpoint}/doctors/${id}`
      )
      .pipe(map((dto) => new Doctor(dto)));
  }

  /**
   * Gets a list of all Helpers
   *
   * @returns List of Helpers
   */
  public getHelpers(): Observable<Helper[]> {
    return this.httpClient
      .get<HelperDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/helpers`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Helper(dto))));
  }

  /**
   * Gets a single Helper by his unique id
   * @param id Helper Id
   *
   * @returns single Helper
   */
  public getHelperById(id: number): Observable<Helper> {
    return this.httpClient
      .get<HelperDto>(
        `${environment.apiHost}${environment.apiEndpoint}/helpers/${id}`
      )
      .pipe(map((dto) => new Helper(dto)));
  }

  /**
   * Creates a new Helper in Database.
   * @param helper Helper Object that should be created in Database. Has to be instance of Helper class
   *
   * @returns newly created Helper
   */
  public createHelper(helper: Helper): Observable<Helper> {
    if (!(helper instanceof Helper)) {
      throw new Error('Parameter is not instance of Helper class');
    }
    return this.httpClient
      .put<HelperDto>(
        `${environment.apiHost}${environment.apiEndpoint}/helpers`,
        helper.toDto()
      )
      .pipe(map((dto) => new Helper(dto)));
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
    id: number,
    updatedHelper: RecursivePartial<Helper>
  ): Observable<Helper> {
    return this.httpClient
      .post<HelperDto>(
        `${environment.apiHost}${environment.apiEndpoint}/helpers/${id}`,
        Helper.partialToDto(updatedHelper)
      )
      .pipe(map((dto) => new Helper(dto)));
  }

  /**
   * Deletes a Helper from Database.
   * @param id Identifier of Helper to delete
   *
   * @returns deleted Helper object
   */
  public deleteHelper(id: number): Observable<Helper> {
    return this.httpClient
      .delete<HelperDto>(
        `${environment.apiHost}${environment.apiEndpoint}/helpers/${id}`
      )
      .pipe(map((dto) => new Helper(dto)));
  }

  /**
   * Gets a list of all Cleaners
   *
   * @returns List of Cleaners
   */
  public getCleaners(): Observable<Cleaner[]> {
    return this.httpClient
      .get<CleanerDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/cleaners`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Cleaner(dto))));
  }

  /**
   * Gets a single Cleaner by his unique id
   * @param id Cleaner Id
   *
   * @returns single Cleaner
   */
  public getCleanerById(id: number): Observable<Cleaner> {
    return this.httpClient
      .get<CleanerDto>(
        `${environment.apiHost}${environment.apiEndpoint}/cleaners/${id}`
      )
      .pipe(map((dto) => new Cleaner(dto)));
  }

  /**
   * Creates a new Cleaner in Database.
   * @param cleaner Cleaner Object that should be created in Database. Has to be instance of Cleaner class
   *
   * @returns newly created Cleaner
   */
  public createCleaner(cleaner: Cleaner): Observable<Cleaner> {
    if (!(cleaner instanceof Cleaner)) {
      throw new Error('Given parameter is not instance of Cleaner class');
    }
    return this.httpClient
      .put<CleanerDto>(
        `${environment.apiHost}${environment.apiEndpoint}/cleaners`,
        cleaner.toDto()
      )
      .pipe(map((dto) => new Cleaner(dto)));
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
    id: number,
    updatedCleaner: RecursivePartial<Cleaner>
  ): Observable<Cleaner> {
    return this.httpClient
      .post<CleanerDto>(
        `${environment.apiHost}${environment.apiEndpoint}/cleaners/${id}`,
        Cleaner.partialToDto(updatedCleaner)
      )
      .pipe(map((dto) => new Cleaner(dto)));
  }

  /**
   * Deletes a Cleaner from Database.
   * @param id Identifier of Cleaner to delete
   *
   * @returns deleted Cleaner object
   */
  public deleteCleaner(id: number): Observable<Cleaner> {
    return this.httpClient
      .delete<CleanerDto>(
        `${environment.apiHost}${environment.apiEndpoint}/cleaners/${id}`
      )
      .pipe(map((dto) => new Cleaner(dto)));
  }

  /**
   * Gets a list of all Patients
   *
   * @returns List of Patients
   */
  public getPatients(): Observable<Patient[]> {
    return this.httpClient
      .get<PatientDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/patients`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Patient(dto))));
  }

  /**
   * Gets a single Patient by his unique id
   * @param id Patient Id
   *
   * @returns single Patient
   */
  public getPatientById(id: number): Observable<Patient> {
    return this.httpClient
      .get<PatientDto>(
        `${environment.apiHost}${environment.apiEndpoint}/patients/${id}`
      )
      .pipe(map((dto) => new Patient(dto)));
  }

  /**
   * Creates a new Patient in Database.
   * @param patient Patient Object that should be created in Database. Has to be instance of Patient class
   *
   * @returns newly created Patient
   */
  public createPatient(patient: Patient): Observable<Patient> {
    if (!(patient instanceof Patient)) {
      throw new Error('Parameter is not instance of Patient class');
    }
    return this.httpClient
      .put<PatientDto>(
        `${environment.apiHost}${environment.apiEndpoint}/patients`,
        patient.toDto()
      )
      .pipe(map((dto) => new Patient(dto)));
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
    id: number,
    updatedPatient: RecursivePartial<Patient>
  ): Observable<Patient> {
    return this.httpClient
      .post<PatientDto>(
        `${environment.apiHost}${environment.apiEndpoint}/patients/${id}`,
        Patient.partialToDto(updatedPatient)
      )
      .pipe(map((dto) => new Patient(dto)));
  }

  /**
   * Deletes a Patient from Database.
   * @param id Identifier of Patient to delete
   *
   * @returns deleted Patient object
   */
  public deletePatient(id: number): Observable<Patient> {
    return this.httpClient
      .delete<PatientDto>(
        `${environment.apiHost}${environment.apiEndpoint}/patients/${id}`
      )
      .pipe(map((dto) => new Patient(dto)));
  }

  /**
   * Gets a list of all Stations
   *
   * @returns List of Stations
   */
  public getStations(): Observable<Station[]> {
    return this.httpClient
      .get<StationDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/stations`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Station(dto))));
  }

  /**
   * Gets a single Station by his unique id
   * @param id Station Id
   *
   * @returns single Station
   */
  public getStationById(id: number): Observable<Station> {
    return this.httpClient
      .get<StationDto>(
        `${environment.apiHost}${environment.apiEndpoint}/stations/${id}`
      )
      .pipe(map((dto) => new Station(dto)));
  }

  /**
   * Creates a new Station in Database.
   * @param station Station Object that should be created in Database. This has to be a class instance of Station
   *
   * @returns newly created Station
   */
  public createStation(station: Station): Observable<Station> {
    if (!(station instanceof Station)) {
      throw new Error('Parameter is not instance of class Station');
    }
    return this.httpClient
      .put<StationDto>(
        `${environment.apiHost}${environment.apiEndpoint}/stations`,
        station.toDto()
      )
      .pipe(map((dto) => new Station(dto)));
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
    id: number,
    updatedStation: RecursivePartial<Station>
  ): Observable<Station> {
    return this.httpClient
      .post<StationDto>(
        `${environment.apiHost}${environment.apiEndpoint}/stations/${id}`,
        Station.partialToDto(updatedStation)
      )
      .pipe(map((dto) => new Station(dto)));
  }

  /**
   * Deletes a Station from Database.
   * @param id Identifier of Station to delete
   *
   * @returns deleted Station object
   */
  public deleteStation(id: number): Observable<Station> {
    return this.httpClient
      .delete<StationDto>(
        `${environment.apiHost}${environment.apiEndpoint}/stations/${id}`
      )
      .pipe(map((dto) => new Station(dto)));
  }

  /**
   * Gets a list of all Shifts
   *
   * @returns List of Shifts
   */
  public getShifts(): Observable<Shift[]> {
    return this.httpClient
      .get<ShiftDto[]>(
        `${environment.apiHost}${environment.apiEndpoint}/shifts`
      )
      .pipe(map((dtoArr) => dtoArr.map((dto) => new Shift(dto))));
  }

  /**
   * Gets a single Shift by his unique id
   * @param id Shift Id
   *
   * @returns single Shift
   */
  public getShiftById(id: number): Observable<Shift> {
    return this.httpClient
      .get<ShiftDto>(
        `${environment.apiHost}${environment.apiEndpoint}/shifts/${id}`
      )
      .pipe(map((dto) => new Shift(dto)));
  }

  /**
   * Creates a new Shift in Database.
   * @param shift Shift Object that should be created in Database. Has to be instance of Shift class
   *
   * @returns newly created Shift
   */
  public createShift(shift: Shift): Observable<Shift> {
    if (!(shift instanceof Shift)) {
      throw new Error('Parameter is not instance of Shift class');
    }
    return this.httpClient
      .put<ShiftDto>(
        `${environment.apiHost}${environment.apiEndpoint}/shifts`,
        shift.toDto()
      )
      .pipe(map((dto) => new Shift(dto)));
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
    id: number,
    updatedShift: RecursivePartial<Shift>
  ): Observable<Shift> {
    return this.httpClient
      .post<ShiftDto>(
        `${environment.apiHost}${environment.apiEndpoint}/shifts/${id}`,
        Shift.partialToDto(updatedShift)
      )
      .pipe(map((dto) => new Shift(dto)));
  }

  /**
   * Deletes a Shift from Database.
   * @param id Identifier of Shift to delete
   *
   * @returns deleted Shift object
   */
  public deleteShift(id: number): Observable<Shift> {
    return this.httpClient
      .delete<ShiftDto>(
        `${environment.apiHost}${environment.apiEndpoint}/shifts/${id}`
      )
      .pipe(map((dto) => new Shift(dto)));
  }
}
