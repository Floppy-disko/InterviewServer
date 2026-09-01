import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service';
import { IntervistaController } from './intervista.controller';

@Module({
  controllers: [IntervistaController],
  providers: [IntervistaService],
})
export class IntervistaModule {}
