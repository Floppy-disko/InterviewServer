import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { UtenteController } from './utente.controller';
import { PrismaService } from 'src/prisma.service';
import { UtenteMapper } from './utente.mapper';

@Module({
  controllers: [UtenteController],
  providers: [UtenteService, PrismaService, UtenteMapper],
})
export class UtenteModule {}
