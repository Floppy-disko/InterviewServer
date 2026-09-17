import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service';
import { IntervistaController } from './intervista.controller';
import { IntervistaMapper } from './intervista.mapper';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IntervistaController],
  providers: [IntervistaService, PrismaService, IntervistaMapper],
})
export class IntervistaModule {}
