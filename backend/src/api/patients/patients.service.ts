import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Patient, CreatePatient, UpdatePatient } from './patient.dto';

@Injectable()
export class PatientsService {
  constructor(private db: DatabaseService) {}

  async createPatient(createPat: CreatePatient): Promise<Patient> {
    const patient = new Patient();
    patient.name = createPat.name;
    patient.surname = createPat.surname;
    if (createPat.station) {
    }
    if (createPat.station) {
      try {
        const station = await this.db.getStationById(createPat.station);
        patient.station = station;
      } catch (e) {
        console.error(e);
      }
    }
    return this.db.savePatient(patient);
  }

  async updatePatient(id: number, updatePat: UpdatePatient): Promise<Patient> {
    const patient = await this.db.getPatientById(id);

    if (updatePat.name) {
      patient.name = updatePat.name;
    }

    if (updatePat.surname) {
      patient.surname = updatePat.surname;
    }

    if (
      updatePat.station &&
      (!patient.station || patient.station.id !== updatePat.station)
    ) {
      try {
        const station = await this.db.getStationById(updatePat.station);
        patient.station = station;
      } catch (e) {
        console.error(e);
      }
    }

    return this.db.savePatient(patient);
  }

  async deletePatient(id: number): Promise<Patient> {
    const patient = await this.db.getPatientById(id);
    await this.db.deletePatient(id);
    return patient;
  }
}
