import { Station, UpdateStation } from '../stations/station.dto';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Patient {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  surname: string;

  @ValidateNested()
  @ManyToOne(
    type => Station,
    station => station.patients,
  )
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
