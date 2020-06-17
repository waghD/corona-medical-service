import { Station, StationDto } from './station.model';
import { RecursivePartial } from './partial.model';

export interface PatientDto {
  id: string;
  name: string;
  surname: string;
  station?: StationDto;
}

export interface PatientUploadDto {
  id: string;
  name: string;
  surname: string;
  station?: StationDto;
}

export class Patient {
  public readonly id: string;
  public name: string;
  public surname: string;
  public station?: Station;

  constructor(dto: PatientDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
    this.station = new Station(dto.station);
  }

  toDto(): PatientUploadDto {
    const dto: PatientUploadDto = {
      id: this.id,
      name: this.name,
      surname: this.surname,
    };
    if (this.station) {
      dto.station = this.station.toDto();
    }
    return dto;
  }

  static partialToDto(
    partial: RecursivePartial<Patient>
  ): RecursivePartial<PatientUploadDto> {
    const dto: RecursivePartial<PatientUploadDto> = {};
    for (let key in partial) {
      if (key === 'station') {
        dto[key] = Station.partialToDto(partial.station);
      } else {
        dto[key] = partial[key];
      }
    }
    return dto;
  }
}
