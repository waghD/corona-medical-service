import { Station } from '../stations/station.dto';
import { IsInt, IsString, ValidateNested, IsOptional } from 'class-validator';
import { OmitType } from '@nestjs/swagger';
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
  @ManyToOne(type => Station, { onDelete: 'CASCADE' })
  @JoinColumn()
  station: Station;
}

export class UpdatePatient {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsInt()
  station?: number;
}
export class CreatePatient extends OmitType(Patient, ['id', 'station']) {
  @IsInt()
  station: number;
}
