import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service';
import { IntervistaController } from './intervista.controller';
import { IntervistaMapper } from './intervista.mapper';

@Module({
  controllers: [IntervistaController],
  providers: [IntervistaService, IntervistaMapper],
})
export class IntervistaModule {}
