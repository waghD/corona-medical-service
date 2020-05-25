import { IsInt, IsString } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class Doctor {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  profession: string;
}

export class UpdateDoctor extends PartialType(Doctor) {}
export class CreateDoctor extends OmitType(Doctor, ['id']) {}
