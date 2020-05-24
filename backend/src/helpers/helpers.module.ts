import { HelpersService } from './helpers.service';
import { HelpersController } from './helpers.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HelpersController],
  providers: [HelpersService],
})
export class HelpersModule {}
