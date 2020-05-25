import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  Param,
  NotImplementedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Patient, UpdatePatient, CreatePatient } from './patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@UsePipes(ValidationPipe)
@Controller('patients')
export class PatientsController {
  @Get()
  getAll(): Patient[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Patient {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreatePatient): Patient {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() patient: UpdatePatient): Patient {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Patient {
    throw new NotImplementedException();
  }
}
