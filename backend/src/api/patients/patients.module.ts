import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
