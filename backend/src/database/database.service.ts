import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cleaner } from 'src/api/cleaners/cleaner.dto';
import { Doctor } from 'src/api/doctors/doctor.dto';
import { Helper } from 'src/api/helpers/helper.dto';
import { Patient } from 'src/api/patients/patient.dto';
import { Shift } from 'src/api/shifts/shift.dto';
import { Station } from 'src/api/stations/station.dto';

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
    this.cleanerRepo.find().then(data => console.log('cleaner: ', data));
    this.doctorRepo.find().then(data => console.log('doctor: ', data));
    this.helperRepo.find().then(data => console.log('helper: ', data));
    this.patientRepo.find().then(data => console.log('patient: ', data));
    this.shiftRepo.find().then(data => console.log('shift: ', data));
    this.stationRepo.find().then(data => console.log('station: ', data));
  }

  getDoctors() {}
}
