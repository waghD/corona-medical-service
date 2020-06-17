import { Doctor, DoctorDto } from './doctor.model';
import { Helper, HelperDto } from './helper.model';
import { Cleaner, CleanerDto } from './cleaner.model';
import { Station, StationDto } from './station.model';
import { RecursivePartial } from './partial.model';

export interface ShiftDto {
  id: string;
  from: string;
  to: string;
  doc?: DoctorDto;
  helper?: HelperDto;
  cleaner?: CleanerDto;
  station?: StationDto;
}

export interface ShiftUploadDto {
  id: string;
  from: string;
  to: string;
  doc?: DoctorDto;
  helper?: HelperDto;
  cleaner?: CleanerDto;
  station?: StationDto;
}

export class Shift {
  public readonly id: string;
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
      dtoObj.doc = this.doc.toDto();
    }
    if (this.helper) {
      dtoObj.helper = this.helper.toDto();
    }
    if (this.cleaner) {
      dtoObj.cleaner = this.cleaner.toDto();
    }
    if (this.station) {
      dtoObj.station = this.station.toDto();
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
