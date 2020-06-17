import { RecursivePartial } from './partial.model';

export interface StationDto {
  id: number;
  station: string;
}

export class Station {
  public readonly id: number;
  public station: string;

  constructor(dto: StationDto) {
    this.id = dto.id;
    this.station = dto.station;
  }

  toDto(): StationDto {
    return {
      id: this.id,
      station: this.station,
    };
  }

  static partialToDto(
    partial: RecursivePartial<Station>
  ): RecursivePartial<StationDto> {
    const dto: RecursivePartial<StationDto> = {};
    for (let key in partial) {
      dto[key] = partial[key];
    }
    return dto;
  }
}
