import { IsInt, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Shift } from '../shifts/shift.dto';

@Entity()
export class Helper {
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

export class UpdateHelper extends PartialType(Helper) {}
export class CreateHelper extends OmitType(Helper, ['id']) {}
