import { IsInt, IsString } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
