import { HelpersService } from './helpers.service';
import { HelpersController } from './helpers.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HelpersController],
  providers: [HelpersService],
})
export class HelpersModule {}
