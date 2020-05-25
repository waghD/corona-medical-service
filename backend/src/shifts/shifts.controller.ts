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
import { Shift, UpdateShift, CreateShift } from './shift.dto';
import { Patient } from 'src/patients/patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shifts')
@UsePipes(ValidationPipe)
@Controller('shifts')
export class ShiftsController {
  @Get()
  getAll(): Shift[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Shift {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreateShift): Shift {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() shift: UpdateShift): Shift {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Shift {
    throw new NotImplementedException();
  }
}
