import { Doctor, DoctorDto } from './doctor.model';
import { Helper, HelperDto } from './helper.model';
import { Cleaner, CleanerDto } from './cleaner.model';
import { Station, StationDto } from './station.model';
import { RecursivePartial } from './partial.model';

export interface ShiftDto {
  id: number;
  from: string;
  to: string;
  doc?: DoctorDto;
  helper?: HelperDto;
  cleaner?: CleanerDto;
  station?: StationDto;
}

export interface ShiftUploadDto {
  id: number;
  from: string;
  to: string;
  doc?: number;
  helper?: number;
  cleaner?: number;
  station?: number;
}

export class Shift {
  public readonly id: number;
  public from: Date;
  public to: Date;
  public doc?: Doctor;
  public helper?: Helper;
  public cleaner?: Cleaner;
  public station?: Station;

  constructor(dto: ShiftDto) {
    this.id = dto.id;
    this.from = new Date(dto.from);
    this.to = new Date(dto.to);
    if (dto.doc) {
      this.doc = new Doctor(dto.doc);
    }
    if (dto.helper) {
      this.helper = new Helper(dto.helper);
    }
    if (dto.cleaner) {
      this.cleaner = new Cleaner(dto.cleaner);
    }
    if (dto.station) {
      this.station = new Station(dto.station);
    }
  }

  toDto(): ShiftUploadDto {
    const dtoObj: ShiftUploadDto = {
      id: this.id,
      from: this.from.toISOString(),
      to: this.to.toISOString(),
    };
    if (this.doc) {
      dtoObj.doc = this.doc.id;
    }
    if (this.helper) {
      dtoObj.helper = this.helper.id;
    }
    if (this.cleaner) {
      dtoObj.cleaner = this.cleaner.id;
    }
    if (this.station) {
      dtoObj.station = this.station.id;
    }
    return dtoObj;
  }

  static partialToDto(
    partial: RecursivePartial<Shift>
  ): RecursivePartial<ShiftUploadDto> {
    const dto: RecursivePartial<ShiftUploadDto> = {};
    if (partial.id) {
      dto.id = partial.id;
    }
    if (partial.from) {
      dto.from = (partial.from as Date).toISOString();
    }
    if (partial.to) {
      dto.to = (partial.to as Date).toISOString();
    }
    if (partial.doc && partial.doc.id) {
      dto.doc = partial.doc.id;
    }
    if (partial.helper && partial.helper.id) {
      dto.helper = partial.helper.id;
    }
    if (partial.cleaner && partial.cleaner.id) {
      dto.cleaner = partial.cleaner.id;
    }
    if (partial.station && partial.station.id) {
      dto.station = partial.station.id;
    }
    return dto;
  }
}
