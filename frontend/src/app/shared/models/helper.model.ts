import { RecursivePartial } from './partial.model';

export interface HelperDto {
  id: number;
  name: string;
  surname: string;
}

export class Helper {
  public readonly id: number;
  public name: string;
  public surname: string;

  constructor(dto: HelperDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
  }

  toDto(): HelperDto {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
    };
  }

  static partialToDto(
    partial: RecursivePartial<Helper>
  ): RecursivePartial<HelperDto> {
    const dto: RecursivePartial<HelperDto> = {};
    for (let key in partial) {
      dto[key] = partial[key];
    }
    return dto;
  }
}
