import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
