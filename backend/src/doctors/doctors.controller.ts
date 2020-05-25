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
import { Doctor, UpdateDoctor, CreateDoctor } from './doctor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@UsePipes(ValidationPipe)
@Controller('doctors')
export class DoctorsController {
  @Get()
  getAll(): Doctor[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Doctor {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreateDoctor): Doctor {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() doctor: UpdateDoctor): Doctor {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Doctor {
    throw new NotImplementedException();
  }
}
