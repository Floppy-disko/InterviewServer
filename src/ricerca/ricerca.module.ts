import { Module } from '@nestjs/common';
import { RicercaService } from './ricerca.service.js';
import { RicercaController } from './ricerca.controller.js';
import { PrismaService } from '../prisma.service.js';
import { RicercaMapper } from './ricerca.mapper.js';

@Module({
  controllers: [RicercaController],
  providers: [RicercaService, PrismaService, RicercaMapper],
})
export class RicercaModule {}
