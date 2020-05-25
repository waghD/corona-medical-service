import { IsInt, IsString } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class Station {
  @IsInt()
  id: number;

  @IsString()
  station: string;
}

export class UpdateStation extends PartialType(Station) {}
export class CreateStation extends OmitType(Station, ['id']) {}
