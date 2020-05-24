import { Doctor, DoctorDto } from './doctor.model';
import { Helper, HelperDto } from './helper.model';
import { Cleaner, CleanerDto } from './cleaner.model';
import { Station, StationDto } from './station.model';
import { RecursivePartial } from './partial.model';

export interface ShiftDto {
  id: number;
  from: string;
  to: string;
  doc: DoctorDto;
  helper: HelperDto;
  cleaner: CleanerDto;
  station: StationDto;
}

export class Shift {
  public readonly id: number;
  public from: Date;
  public to: Date;
  public doc: Doctor;
  public helper: Helper;
  public cleaner: Cleaner;
  public station: Station;

  constructor(dto: ShiftDto) {
    this.id = dto.id;
    this.from = new Date(dto.from);
    this.to = new Date(dto.to);
    this.doc = new Doctor(dto.doc);
    this.helper = new Helper(dto.helper);
    this.cleaner = new Cleaner(dto.cleaner);
    this.station = new Station(dto.station);
  }

  toDto(): ShiftDto {
    return {
      id: this.id,
      from: this.from.toLocaleDateString(),
      to: this.to.toLocaleDateString(),
      doc: this.doc.toDto(),
      helper: this.helper.toDto(),
      cleaner: this.cleaner.toDto(),
      station: this.station.toDto(),
    };
  }

  static partialToDto(
    partial: RecursivePartial<Shift>
  ): RecursivePartial<ShiftDto> {
    const dto: RecursivePartial<ShiftDto> = {};
    if (partial.id) {
      dto.id = partial.id;
    }
    if (partial.from) {
      dto.from = (partial.from as Date).toLocaleDateString();
    }
    if (partial.to) {
      dto.to = (partial.to as Date).toLocaleDateString();
    }
    if (partial.doc) {
      dto.doc = Doctor.partialToDto(partial.doc);
    }
    if (partial.helper) {
      dto.helper = Helper.partialToDto(partial.helper);
    }
    if (partial.cleaner) {
      dto.cleaner = Cleaner.partialToDto(partial.cleaner);
    }
    if (partial.station) {
      dto.station = Station.partialToDto(partial.station);
    }
    return dto;
  }
}
