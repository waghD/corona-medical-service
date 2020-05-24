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
import { Shift } from './shift.dto';
import { Patient } from 'src/patients/patient.dto';

@Controller('shifts')
export class ShiftsController {
  @Get()
  getAll(): Shift[] {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  get(@Body('id') id: number): Shift {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put()
  create(@Body() cleaner: Patient): Shift {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post(':id')
  update(@Body('id') id: number): Shift {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  delete(@Body('id') id: number): Shift {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
