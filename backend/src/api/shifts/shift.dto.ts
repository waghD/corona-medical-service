import { Doctor } from '../doctors/doctor.dto';
import { Helper } from '../helpers/helper.dto';
import { Cleaner } from '../cleaners/cleaner.dto';
import { Station } from '../stations/station.dto';
import {
  IsInt,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
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
  @ManyToOne(type => Doctor, { onDelete: 'CASCADE' })
  @JoinColumn()
  doc: Doctor;

  @ValidateNested()
  @ManyToOne(type => Helper, { onDelete: 'CASCADE' })
  @JoinColumn()
  helper: Helper;

  @ValidateNested()
  @ManyToOne(type => Cleaner, { onDelete: 'CASCADE' })
  @JoinColumn()
  cleaner: Cleaner;

  @ValidateNested()
  @ManyToOne(type => Station, { onDelete: 'CASCADE' })
  @JoinColumn()
  station: Station;
}

export class UpdateShift {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsDateString()
  from?: Date;

  @IsOptional()
  @IsDateString()
  to?: Date;

  @IsOptional()
  @IsInt()
  doc?: number;

  @IsOptional()
  @IsInt()
  helper?: number;

  @IsOptional()
  @IsInt()
  cleaner?: number;

  @IsOptional()
  @IsInt()
  station?: number;
}
export class CreateShift extends OmitType(Shift, [
  'id',
  'doc',
  'helper',
  'cleaner',
  'station',
]) {
  @IsOptional()
  @IsInt()
  doc: number;

  @IsOptional()
  @IsInt()
  helper: number;

  @IsOptional()
  @IsInt()
  cleaner: number;

  @IsOptional()
  @IsInt()
  station: number;
}
