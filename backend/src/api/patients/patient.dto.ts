import { Station } from '../stations/station.dto';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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
  @ManyToOne(type => Station)
  @JoinColumn()
  station: Station;
}

export class UpdatePatient extends PartialType(OmitType(Patient, ['station'])) {
  @IsInt()
  station?: number;
}
export class CreatePatient extends OmitType(Patient, ['id', 'station']) {
  @IsInt()
  station: number;
}
