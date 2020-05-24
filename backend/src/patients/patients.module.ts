import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
