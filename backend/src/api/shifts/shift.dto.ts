import { Doctor, UpdateDoctor } from '../doctors/doctor.dto';
import { Helper, UpdateHelper } from '../helpers/helper.dto';
import { Cleaner, UpdateCleaner } from '../cleaners/cleaner.dto';
import { Station, UpdateStation } from '../stations/station.dto';
import { IsInt, IsDateString, ValidateNested } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Shift {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @Column()
  from: Date;

  @IsDateString()
  @Column()
  to: Date;

  @ValidateNested()
  @ManyToOne(type => Doctor)
  @JoinColumn()
  doc: Doctor;

  @ValidateNested()
  @ManyToOne(type => Helper)
  @JoinColumn()
  helper: Helper;

  @ValidateNested()
  @ManyToOne(type => Cleaner)
  @JoinColumn()
  cleaner: Cleaner;

  @ValidateNested()
  @ManyToOne(type => Station)
  @JoinColumn()
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
