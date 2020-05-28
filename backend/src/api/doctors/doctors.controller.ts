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
import { Doctor, UpdateDoctor, CreateDoctor } from './doctor.dto';
import { ApiTags } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Doctors')
@UsePipes(ValidationPipe)
@Controller('doctors')
export class DoctorsController {
  constructor(private service: DoctorsService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Doctor[]> {
    try {
      const doctors = await this.db.getDoctors();
      return doctors;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Doctor> {
    try {
      const doctor = await this.db.getDoctorById(id);
      return doctor;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() doctor: CreateDoctor): Promise<Doctor> {
    try {
      const doc = await this.service.createDoctor(doctor);
      return doc;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() doctor: UpdateDoctor,
  ): Promise<Doctor> {
    try {
      const doc = await this.service.updateDoctor(id, doctor);
      return doc;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Doctor> {
    try {
      const doc = await this.service.deleteDoctor(id);
      return doc;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
