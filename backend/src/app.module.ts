import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { StationsModule } from './api/stations/stations.module';
import { ShiftsModule } from './api/shifts/shifts.module';
import { PatientsModule } from './api/patients/patients.module';
import { HelpersModule } from './api/helpers/helpers.module';
import { DoctorsModule } from './api/doctors/doctors.module';
import { CleanersModule } from './api/cleaners/cleaners.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DatabaseModule,
    StationsModule,
    ShiftsModule,
    PatientsModule,
    HelpersModule,
    DoctorsModule,
    CleanersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'coronaDB',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
