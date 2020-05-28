import { IsInt, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shift } from '../shifts/shift.dto';

@Entity()
export class Cleaner {
  @IsInt()
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  surname: string;
}

export class UpdateCleaner extends PartialType(Cleaner) {}
export class CreateCleaner extends OmitType(Cleaner, ['id']) {}
