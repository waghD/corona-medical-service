import { RecursivePartial } from './partial.model';

export interface DoctorDto {
  id: number;
  name: string;
  surname: string;
  profession: string;
}

export class Doctor {
  public readonly id: number;
  public name: string;
  public surname: string;
  public profession: string;

  constructor(dto: DoctorDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.surname = dto.surname;
    this.profession = dto.profession;
  }

  toDto(): DoctorDto {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      profession: this.profession,
    };
  }

  static partialToDto(
    partial: RecursivePartial<Doctor>
  ): RecursivePartial<DoctorDto> {
    const dto: RecursivePartial<DoctorDto> = {};
    for (let key in partial) {
      dto[key] = partial[key];
    }
    return dto;
  }
}
