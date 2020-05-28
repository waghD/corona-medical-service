import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { Shift, UpdateShift, CreateShift } from './shift.dto';
import { ApiTags } from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Shifts')
@UsePipes(ValidationPipe)
@Controller('shifts')
export class ShiftsController {
  constructor(private service: ShiftsService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Shift[]> {
    try {
      const shifts = await this.db.getShifts();
      return shifts;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Shift> {
    try {
      const shift = await this.db.getShiftById(id);
      return shift;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() createShift: CreateShift): Promise<Shift> {
    try {
      const shift = await this.service.createShift(createShift);
      return shift;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateShift: UpdateShift,
  ): Promise<Shift> {
    try {
      const shift = await this.service.updateShift(id, updateShift);
      return shift;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Shift> {
    try {
      const shift = await this.service.deleteShift(id);
      return shift;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
