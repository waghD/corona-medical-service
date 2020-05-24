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
import { Cleaner } from './cleaner.dto';

@Controller('cleaners')
export class CleanersController {
  @Get()
  getAll(): Cleaner[] {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Get(':id')
  get(@Body('id') id: number): Cleaner {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Put()
  create(@Body() cleaner: Cleaner): Cleaner {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post(':id')
  update(@Body('id') id: number): Cleaner {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Delete(':id')
  delete(@Body('id') id: number): Cleaner {
    throw new HttpException('Not yet Implemented', HttpStatus.NOT_IMPLEMENTED);
  }
}
