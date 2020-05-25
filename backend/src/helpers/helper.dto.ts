import { IsInt, IsString } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class Helper {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;
}

export class UpdateHelper extends PartialType(Helper) {}
export class CreateHelper extends OmitType(Helper, ['id']) {}
