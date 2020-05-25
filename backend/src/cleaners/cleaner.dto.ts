import { IsInt, IsString } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class Cleaner {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}

export class UpdateCleaner extends PartialType(Cleaner) {}
export class CreateCleaner extends OmitType(Cleaner, ['id']) {}
