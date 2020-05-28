import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cleaner } from 'src/api/cleaners/cleaner.dto';
import { Doctor } from 'src/api/doctors/doctor.dto';
import { Helper } from 'src/api/helpers/helper.dto';
import { Patient } from 'src/api/patients/patient.dto';
import { Shift } from 'src/api/shifts/shift.dto';
import { Station } from 'src/api/stations/station.dto';
import {
  generateDoctors,
  generateHelpers,
  generateCleaners,
  generateShifts,
  generateStations,
  generatePatients,
} from './initial-data';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Cleaner) private cleanerRepo: Repository<Cleaner>,
    @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
    @InjectRepository(Helper) private helperRepo: Repository<Helper>,
    @InjectRepository(Patient) private patientRepo: Repository<Patient>,
    @InjectRepository(Shift) private shiftRepo: Repository<Shift>,
    @InjectRepository(Station) private stationRepo: Repository<Station>,
  ) {
    this.initDatabase()
      .then(() => console.log('Database initialized'))
      .catch(error => {
        console.warn('Database failed initialization');
        console.error(error);
      });
  }

  private async initDatabase() {
    const doctors = await this.doctorRepo.save(generateDoctors());
    const helpers = await this.helperRepo.save(generateHelpers());
    const cleaners = await this.cleanerRepo.save(generateCleaners());
    const stations = await this.stationRepo.save(generateStations());
    await this.patientRepo.save(generatePatients(stations));
    await this.shiftRepo.save(
      generateShifts(doctors, helpers, cleaners, stations),
    );
  }

  public getDoctors(): Promise<Doctor[]> {
    return this.doctorRepo.find();
  }

  public getDoctorById(id: number): Promise<Doctor> {
    return this.doctorRepo.findOne(id);
  }

  public saveDoctor(doctor: Doctor): Promise<Doctor> {
    return this.doctorRepo.save(doctor);
  }

  public async deleteDoctor(id: number): Promise<void> {
    await this.doctorRepo.delete(id);
  }

  public getHelpers(): Promise<Helper[]> {
    return this.helperRepo.find();
  }

  public getHelperById(id: number): Promise<Helper> {
    return this.helperRepo.findOne(id);
  }

  public saveHelper(helper: Helper): Promise<Helper> {
    return this.helperRepo.save(helper);
  }

  public async deleteHelper(id: number): Promise<void> {
    await this.helperRepo.delete(id);
  }

  public getCleaners(): Promise<Cleaner[]> {
    return this.cleanerRepo.find();
  }

  public getCleanerById(id: number): Promise<Cleaner> {
    return this.cleanerRepo.findOne(id);
  }

  public saveCleaner(cleaner: Cleaner): Promise<Cleaner> {
    return this.cleanerRepo.save(cleaner);
  }

  public async deleteCleaner(id: number): Promise<void> {
    await this.cleanerRepo.delete(id);
  }

  public getStations(): Promise<Station[]> {
    return this.stationRepo.find();
  }

  public getStationById(id: number): Promise<Station> {
    return this.stationRepo.findOne(id);
  }

  public saveStaion(station: Station): Promise<Station> {
    return this.stationRepo.save(station);
  }

  public async deleteStation(id: number): Promise<void> {
    await this.stationRepo.delete(id);
  }

  public getPatients(): Promise<Patient[]> {
    return this.patientRepo.find({
      relations: ['station'],
    });
  }

  public getPatientById(id: number): Promise<Patient> {
    return this.patientRepo.findOne(id, {
      relations: ['station'],
    });
  }

  public async savePatient(patient: Patient): Promise<Patient> {
    const pat = await this.patientRepo.save(patient);
    if (patient.station) {
      const station = await this.stationRepo.save(patient.station);
      pat.station = station;
    }
    return pat;
  }

  public async deletePatient(id: number): Promise<void> {
    await this.patientRepo.delete(id);
  }

  public getShifts(): Promise<Shift[]> {
    return this.shiftRepo.find({
      relations: ['doc', 'helper', 'cleaner', 'station'],
    });
  }

  public getShiftById(id: number): Promise<Shift> {
    return this.shiftRepo.findOne(id, {
      relations: ['doc', 'helper', 'cleaner', 'station'],
    });
  }

  public async saveShift(shift: Shift): Promise<Shift> {
    const dbShift = await this.shiftRepo.save(shift);

    const cascadingOperations: Promise<any>[] = [];
    if (shift.doc) {
      cascadingOperations.push(
        this.doctorRepo
          .save(shift.doc)
          .then(dbDoc => (dbShift.doc = dbDoc))
          .catch(err => (dbShift.doc = null)),
      );
    }

    if (shift.helper) {
      cascadingOperations.push(
        this.helperRepo
          .save(shift.helper)
          .then(dbHelper => (dbShift.helper = dbHelper))
          .catch(err => (dbShift.helper = null)),
      );
    }

    if (shift.cleaner) {
      cascadingOperations.push(
        this.cleanerRepo
          .save(shift.cleaner)
          .then(dbCleaner => (dbShift.cleaner = dbCleaner))
          .catch(err => (dbShift.cleaner = null)),
      );
    }

    if (shift.station) {
      cascadingOperations.push(
        this.stationRepo
          .save(shift.station)
          .then(dbStation => (dbShift.station = dbStation))
          .catch(err => (dbShift.station = null)),
      );
    }

    await Promise.all(cascadingOperations);

    return dbShift;
  }

  public async deleteShift(id: number): Promise<void> {
    await this.shiftRepo.delete(id);
  }
}
