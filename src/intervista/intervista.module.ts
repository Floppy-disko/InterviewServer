import { Module } from '@nestjs/common';
import { IntervistaService } from './intervista.service.js';
import { IntervistaController } from './intervista.controller.js';
import { IntervistaMapper } from './intervista.mapper.js';
import { PrismaService } from '../prisma.service.js';
import { forwardRef } from '@nestjs/common';
import { UtenteModule } from '../utente/utente.module.js';
import { RicercaModule } from '../ricerca/ricerca.module.js';
import { AppMapper } from '../app.mapper.js';

@Module({
  imports: [forwardRef(() => UtenteModule), forwardRef(() => RicercaModule)],
  controllers: [IntervistaController],
  providers: [IntervistaService, PrismaService, IntervistaMapper, AppMapper],
  exports: [IntervistaMapper],
})
export class IntervistaModule {}
