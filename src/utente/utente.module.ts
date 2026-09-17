import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service.js';
import { UtenteController } from './utente.controller.js';
import { PrismaService } from '../prisma.service.js';
import { UtenteMapper } from './utente.mapper.js';

@Module({
  controllers: [UtenteController],
  providers: [UtenteService, PrismaService, UtenteMapper],
})
export class UtenteModule {}
