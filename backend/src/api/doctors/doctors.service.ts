import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateDoctor, Doctor, UpdateDoctor } from './doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private db: DatabaseService) {}

  async createDoctor(doctor: CreateDoctor): Promise<Doctor> {
    const doc = new Doctor();
    doc.name = doctor.name;
    doc.surname = doctor.surname;
    doc.profession = doctor.profession;
    return this.db.saveDoctor(doc);
  }

  async updateDoctor(id: number, doc: UpdateDoctor): Promise<Doctor> {
    const doctor = await this.db.getDoctorById(id);
    if (doc.name) {
      doctor.name = doc.name;
    }

    if (doc.surname) {
      doctor.surname = doc.surname;
    }

    if (doc.profession) {
      doctor.profession = doc.profession;
    }

    return this.db.saveDoctor(doctor);
  }

  async deleteDoctor(id: number): Promise<Doctor> {
    const doctor = await this.db.getDoctorById(id);
    await this.db.deleteDoctor(id);
    return doctor;
  }
}
