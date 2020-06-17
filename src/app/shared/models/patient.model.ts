import { Station, StationDto } from './station.model';
import { RecursivePartial } from './partial.model';

export interface PatientDto {
  id: number;
  name: string;
  surname: string;
  station: StationDto;
}

export interface PatientUploadDto {
  id: number;
  name: string;
  surname: string;
  station: number;
}

export class Patient {
  public readonly id: number;
  public name: string;
  public surname: string;
  public station: Station;

  constructor(dto: PatientDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
    this.station = new Station(dto.station);
  }

  toDto(): PatientUploadDto {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      station: this.station.id,
    };
  }

  static partialToDto(
    partial: RecursivePartial<Patient>
  ): RecursivePartial<PatientUploadDto> {
    const dto: RecursivePartial<PatientUploadDto> = {};
    for (let key in partial) {
      if (key === 'station') {
        dto[key] = partial.station.id;
      } else {
        dto[key] = partial[key];
      }
    }
    return dto;
  }
}
