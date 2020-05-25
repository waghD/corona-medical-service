import { IsInt, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shift } from '../shifts/shift.dto';

@Entity()
export class Doctor {
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

  @IsString()
  @Column()
  profession: string;

  @ValidateNested()
  @OneToMany(
    type => Shift,
    shift => shift.doc,
  )
  shifts: Shift[];
}

export class UpdateDoctor extends PartialType(Doctor) {}
export class CreateDoctor extends OmitType(Doctor, ['id']) {}
