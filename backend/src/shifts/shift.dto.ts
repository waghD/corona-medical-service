import { Doctor, UpdateDoctor } from '../doctors/doctor.dto';
import { Helper, UpdateHelper } from '../helpers/helper.dto';
import { Cleaner, UpdateCleaner } from '../cleaners/cleaner.dto';
import { Station, UpdateStation } from '../stations/station.dto';
import { IsInt, IsDateString, ValidateNested } from 'class-validator';
import { OmitType } from '@nestjs/swagger';

export class Shift {
  @IsInt()
  id: number;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @ValidateNested()
  doc: Doctor;

  @ValidateNested()
  helper: Helper;

  @ValidateNested()
  cleaner: Cleaner;

  @ValidateNested()
  station: Station;
}

export class UpdateShift {
  @IsInt()
  id?: number;

  @IsDateString()
  from?: string;

  @IsDateString()
  to?: string;

  @ValidateNested()
  doc?: UpdateDoctor;

  @ValidateNested()
  helper?: UpdateHelper;

  @ValidateNested()
  cleaner?: UpdateCleaner;

  @ValidateNested()
  station?: UpdateStation;
}
export class CreateShift extends OmitType(Shift, ['id']) {}
