import { IsInt, IsString, IsOptional } from 'class-validator';
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

export class UpdateStation {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  station?: string;
}
export class CreateStation extends OmitType(Station, ['id']) {}
