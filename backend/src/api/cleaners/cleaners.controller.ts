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
import { Cleaner, UpdateCleaner, CreateCleaner } from './cleaner.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cleaners')
@UsePipes(ValidationPipe)
@Controller('cleaners')
export class CleanersController {
  @Get()
  getAll(): Cleaner[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Cleaner {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreateCleaner): Cleaner {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() cleaner: UpdateCleaner): Cleaner {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Cleaner {
    throw new NotImplementedException();
  }
}
