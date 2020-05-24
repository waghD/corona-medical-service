import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
