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
import { Station, UpdateStation, CreateStation } from './station.dto';
import { ApiTags } from '@nestjs/swagger';
import { StationsService } from './stations.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Stations')
@UsePipes(ValidationPipe)
@Controller('stations')
export class StationsController {
  constructor(private service: StationsService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Station[]> {
    try {
      const stations = await this.db.getStations();
      return stations;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Station> {
    try {
      const station = await this.db.getStationById(id);
      return station;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() createStation: CreateStation): Promise<Station> {
    try {
      const station = await this.service.createStation(createStation);
      return station;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStation: UpdateStation,
  ): Promise<Station> {
    try {
      const station = await this.service.updateStation(id, updateStation);
      return station;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Station> {
    try {
      const station = await this.service.deleteStation(id);
      return station;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
