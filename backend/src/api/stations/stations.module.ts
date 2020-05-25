import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
