import { StationsModule } from './stations/stations.module';
import { ShiftsModule } from './shifts/shifts.module';
import { PatientsModule } from './patients/patients.module';
import { HelpersModule } from './helpers/helpers.module';
import { DoctorsModule } from './doctors/doctors.module';
import { CleanersModule } from './cleaners/cleaners.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    StationsModule,
    ShiftsModule,
    PatientsModule,
    HelpersModule,
    DoctorsModule,
    CleanersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
