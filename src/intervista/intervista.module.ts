import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service.js';
import { IntervistaController } from './intervista.controller.js';

@Module({
  controllers: [IntervistaController],
  providers: [IntervistaService],
})
export class IntervistaModule {}
