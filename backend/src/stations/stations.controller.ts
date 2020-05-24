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
import { Station } from './station.dto';
import { Patient } from 'src/patients/patient.dto';

@Controller('stations')
export class StationsController {
  @Get()
  getAll(): Station[] {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  get(@Body('id') id: number): Station {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put()
  create(@Body() cleaner: Patient): Station {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post(':id')
  update(@Body('id') id: number): Station {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  delete(@Body('id') id: number): Station {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
