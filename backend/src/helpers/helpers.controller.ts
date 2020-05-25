import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  Param,
  NotImplementedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Helper, UpdateHelper, CreateHelper } from './helper.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Helpers')
@UsePipes(ValidationPipe)
@Controller('helpers')
export class HelpersController {
  @Get()
  getAll(): Helper[] {
    throw new NotImplementedException();
  }

  @Get(':id')
  get(@Param('id') id: number): Helper {
    throw new NotImplementedException();
  }

  @Put()
  create(@Body() cleaner: CreateHelper): Helper {
    throw new NotImplementedException();
  }

  @Post(':id')
  update(@Param('id') id: number, @Body() helper: UpdateHelper): Helper {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Helper {
    throw new NotImplementedException();
  }
}
