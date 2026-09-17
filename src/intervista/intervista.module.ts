import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service.js';
import { IntervistaController } from './intervista.controller.js';
import { IntervistaMapper } from './intervista.mapper.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [IntervistaController],
  providers: [IntervistaService, PrismaService, IntervistaMapper],
})
export class IntervistaModule {}
