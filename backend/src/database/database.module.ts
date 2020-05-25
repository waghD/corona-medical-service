import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cleaner } from 'src/api/cleaners/cleaner.dto';
import { Doctor } from 'src/api/doctors/doctor.dto';
import { Helper } from 'src/api/helpers/helper.dto';
import { Patient } from 'src/api/patients/patient.dto';
import { Shift } from 'src/api/shifts/shift.dto';
import { Station } from 'src/api/stations/station.dto';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cleaner,
      Doctor,
      Helper,
      Patient,
      Shift,
      Station,
    ]),
  ],
  controllers: [],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  constructor(private connection: Connection) {}
}
