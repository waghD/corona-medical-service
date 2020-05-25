import { CleanersService } from './cleaners.service';
import { Module } from '@nestjs/common';
import { CleanersController } from './cleaners.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CleanersController],
  providers: [CleanersService],
})
export class CleanersModule {}
