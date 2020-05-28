import {
  Controller,
  Get,
  Body,
  Put,
  Post,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { Helper, UpdateHelper, CreateHelper } from './helper.dto';
import { ApiTags } from '@nestjs/swagger';
import { HelpersService } from './helpers.service';
import { DatabaseService } from 'src/database/database.service';

@ApiTags('Helpers')
@UsePipes(ValidationPipe)
@Controller('helpers')
export class HelpersController {
  constructor(private service: HelpersService, private db: DatabaseService) {}

  @Get()
  async getAll(): Promise<Helper[]> {
    try {
      const helpers = await this.db.getHelpers();
      return helpers;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Helper> {
    try {
      const helper = await this.db.getHelperById(id);
      return helper;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Put()
  async create(@Body() helper: CreateHelper): Promise<Helper> {
    try {
      const help = await this.service.createHelper(helper);
      return help;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Post(':id')
  async update(
    @Param('id') id: number,
    @Body() helper: UpdateHelper,
  ): Promise<Helper> {
    try {
      const help = await this.service.updateHelper(id, helper);
      return help;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Helper> {
    try {
      const help = await this.service.deleteHelper(id);
      return help;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
