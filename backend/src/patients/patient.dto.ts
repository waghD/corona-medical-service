import { Station, UpdateStation } from '../stations/station.dto';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { OmitType } from '@nestjs/swagger';

export class Patient {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @ValidateNested()
  station: Station;
}

export class UpdatePatient {
  @IsInt()
  id?: number;

  @IsString()
  name?: string;

  @IsString()
  surname?: string;

  @ValidateNested()
  station?: UpdateStation;
}
export class CreatePatient extends OmitType(Patient, ['id']) {}
