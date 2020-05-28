import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateShift, Shift, UpdateShift } from './shift.dto';

@Injectable()
export class ShiftsService {
  constructor(private db: DatabaseService) {}

  async createShift(createShift: CreateShift): Promise<Shift> {
    const shift = new Shift();

    shift.from = createShift.from;
    shift.to = createShift.to;

    if (createShift.station) {
      try {
        const station = await this.db.getStationById(createShift.station);
        shift.station = station;
      } catch (e) {
        console.error(e);
      }
    }

    if (createShift.doc) {
      try {
        const doc = await this.db.getDoctorById(createShift.doc);
        shift.doc = doc;
      } catch (e) {
        console.error(e);
      }
    }

    if (createShift.helper) {
      try {
        const helper = await this.db.getHelperById(createShift.helper);
        shift.helper = helper;
      } catch (e) {
        console.error(e);
      }
    }

    if (createShift.cleaner) {
      try {
        const cleaner = await this.db.getCleanerById(createShift.cleaner);
        shift.cleaner = cleaner;
      } catch (e) {
        console.error(e);
      }
    }

    return this.db.saveShift(shift);
  }

  async updateShift(id: number, updateShift: UpdateShift): Promise<Shift> {
    const shift = await this.db.getShiftById(id);

    if (updateShift.from) {
      shift.from = updateShift.from;
    }

    if (updateShift.to) {
      shift.to = updateShift.to;
    }

    if (
      updateShift.station &&
      (!shift.station || shift.station.id !== updateShift.station)
    ) {
      try {
        const station = await this.db.getStationById(updateShift.station);
        shift.station = station;
      } catch (e) {
        console.error(e);
      }
    }

    if (updateShift.doc && (!shift.doc || shift.doc.id !== updateShift.doc)) {
      try {
        const doc = await this.db.getDoctorById(updateShift.doc);
        shift.doc = doc;
      } catch (e) {
        console.error(e);
      }
    }

    if (
      updateShift.helper &&
      (!shift.helper || shift.helper.id !== updateShift.helper)
    ) {
      try {
        const helper = await this.db.getHelperById(updateShift.helper);
        shift.helper = helper;
      } catch (e) {
        console.error(e);
      }
    }

    if (
      updateShift.cleaner &&
      (!shift.cleaner || shift.cleaner.id !== updateShift.cleaner)
    ) {
      try {
        const cleaner = await this.db.getCleanerById(updateShift.cleaner);
        shift.cleaner = cleaner;
      } catch (e) {
        console.error(e);
      }
    }

    return this.db.saveShift(shift);
  }

  async deleteShift(id: number): Promise<Shift> {
    const shift = await this.db.getShiftById(id);
    await this.db.deleteShift(id);
    return shift;
  }
}
