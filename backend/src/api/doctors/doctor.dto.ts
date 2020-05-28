import { IsInt, IsString } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export class UpdateDoctor extends PartialType(Doctor) {}
export class CreateDoctor extends OmitType(Doctor, ['id']) {}
