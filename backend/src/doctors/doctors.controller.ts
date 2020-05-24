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
import { Doctor } from './doctor.dto';

@Controller('doctors')
export class DoctorsController {
  @Get()
  getAll(): Doctor[] {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  get(@Body('id') id: number): Doctor {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put()
  create(@Body() cleaner: Doctor): Doctor {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post(':id')
  update(@Body('id') id: number): Doctor {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  delete(@Body('id') id: number): Doctor {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
