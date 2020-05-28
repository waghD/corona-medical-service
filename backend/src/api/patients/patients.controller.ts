import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { Patient, UpdatePatient, CreatePatient } from './patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Patients')
@UsePipes(ValidationPipe)
@Controller('patients')
export class PatientsController {
  constructor(private service: PatientsService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Patient[]> {
    try {
      const patients = await this.db.getPatients();
      return patients;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Patient> {
    try {
      const patient = await this.db.getPatientById(id);
      return patient;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() createPatient: CreatePatient): Promise<Patient> {
    try {
      const patient = await this.service.createPatient(createPatient);
      return patient;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatient: UpdatePatient,
  ): Promise<Patient> {
    try {
      const patient = await this.service.updatePatient(id, updatePatient);
      return patient;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Patient> {
    try {
      const patient = await this.service.deletePatient(id);
      return patient;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
