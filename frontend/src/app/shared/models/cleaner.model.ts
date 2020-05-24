import { RecursivePartial } from './partial.model';

export interface CleanerDto {
  id: number;
  name: string;
  surname: string;
}

export class Cleaner {
  public readonly id: number;
  public name: string;
  public surname: string;

  constructor(dto: CleanerDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
  }

  public toDto(): CleanerDto {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
    };
  }

  static partialToDto(
    partial: RecursivePartial<Cleaner>
  ): RecursivePartial<CleanerDto> {
    const dto: RecursivePartial<CleanerDto> = {};
    for (let key in partial) {
      dto[key] = partial[key];
    }
    return dto;
  }
}
