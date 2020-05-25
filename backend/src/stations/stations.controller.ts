import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  NotImplementedException,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Station, UpdateStation, CreateStation } from './station.dto';
import { Patient } from 'src/patients/patient.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stations')
@UsePipes(ValidationPipe)
@Controller('stations')
export class StationsController {
  @Get()
  getAll(): Station[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Station {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreateStation): Station {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() station: UpdateStation): Station {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Station {
    throw new NotImplementedException();
  }
}
