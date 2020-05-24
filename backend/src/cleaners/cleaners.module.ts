import { CleanersService } from './cleaners.service';
import { Module } from '@nestjs/common';
import { CleanersController } from './cleaners.controller';

@Module({
  imports: [],
  controllers: [CleanersController],
  providers: [CleanersService],
})
export class CleanersModule {}
