import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Body,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { Patient } from './patient.dto';

@Controller('patients')
export class PatientsController {
  @Get()
  getAll(): Patient[] {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  get(@Body('id') id: number): Patient {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put()
  create(@Body() cleaner: Patient): Patient {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post(':id')
  update(@Body('id') id: number): Patient {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  delete(@Body('id') id: number): Patient {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
