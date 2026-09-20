import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service.js';
import { UtenteController } from './utente.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UtenteMapper } from './utente.mapper.js';
import { forwardRef } from '@nestjs/common';
import { IntervistaModule } from '../intervista/intervista.module.js';
import { RicercaModule } from '../ricerca/ricerca.module.js';
import { AppMapper } from '../app.mapper.js';

@Module({
  imports: [forwardRef(() => IntervistaModule), forwardRef(() => RicercaModule)],
  controllers: [UtenteController],
  providers: [UtenteService, PrismaService, UtenteMapper, AppMapper],
  exports: [UtenteMapper],
})
export class UtenteModule {}
