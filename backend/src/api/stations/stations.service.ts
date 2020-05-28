import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Station, CreateStation, UpdateStation } from './station.dto';

@Injectable()
export class StationsService {
  constructor(private db: DatabaseService) {}

  async createStation(cleaner: CreateStation): Promise<Station> {
    const station = new Station();
    station.station = cleaner.station;
    return this.db.saveStation(station);
  }

  async updateStation(
    id: number,
    updateStation: UpdateStation,
  ): Promise<Station> {
    const station = await this.db.getStationById(id);

    if (updateStation.station) {
      station.station = updateStation.station;
    }

    return this.db.saveStation(station);
  }

  async deleteStation(id: number): Promise<Station> {
    const station = await this.db.getStationById(id);
    await this.db.deleteStation(id);
    return station;
  }
}
