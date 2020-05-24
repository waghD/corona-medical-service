import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
