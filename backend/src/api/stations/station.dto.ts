import { IsInt, IsString, ValidateNested } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
import { Patient, UpdatePatient } from '../patients/patient.dto';
import { OneToMany, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Shift } from '../shifts/shift.dto';

@Entity()
export class Station {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  station: string;
}

export class UpdateStation extends PartialType(Station) {}
export class CreateStation extends OmitType(Station, ['id']) {}
