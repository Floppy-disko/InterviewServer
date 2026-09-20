import { Module } from '@nestjs/common';
import { RicercaService } from './ricerca.service.js';
import { RicercaController } from './ricerca.controller.js';
import { PrismaService } from '../prisma.service.js';
import { RicercaMapper } from './ricerca.mapper.js';
import { forwardRef } from '@nestjs/common';
import { UtenteModule } from '../utente/utente.module.js';
import { IntervistaModule } from '../intervista/intervista.module.js';
import { AppMapper } from '../app.mapper.js';

@Module({
  imports: [forwardRef(() => UtenteModule), forwardRef(() => IntervistaModule)],
  controllers: [RicercaController],
  providers: [RicercaService, PrismaService, RicercaMapper, AppMapper],
  exports: [RicercaMapper],
})
export class RicercaModule {}
