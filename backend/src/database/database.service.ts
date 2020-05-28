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
    this.initDatabase().then(() => console.log('Database initialized'));
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

  getDoctors() {}
}
