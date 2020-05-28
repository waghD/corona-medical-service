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
  InternalServerErrorException,
} from '@nestjs/common';
import { Cleaner, UpdateCleaner, CreateCleaner } from './cleaner.dto';
import { ApiTags } from '@nestjs/swagger';
import { CleanersService } from './cleaners.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Cleaners')
@UsePipes(ValidationPipe)
@Controller('cleaners')
export class CleanersController {
  constructor(private service: CleanersService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Cleaner[]> {
    try {
      const cleaners = await this.db.getCleaners();
      return cleaners;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Cleaner> {
    try {
      const cleaner = await this.db.getCleanerById(id);
      return cleaner;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() createCleaner: CreateCleaner): Promise<Cleaner> {
    try {
      const cleaner = await this.service.createCleaner(createCleaner);
      return cleaner;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() UpdateCleaner: UpdateCleaner,
  ): Promise<Cleaner> {
    try {
      const cleaner = await this.service.updateCleaner(id, UpdateCleaner);
      return cleaner;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Cleaner> {
    try {
      const cleaners = await this.service.deleteCleaner(id);
      return cleaners;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
