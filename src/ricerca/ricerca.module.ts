import { Module } from '@nestjs/common';
import { RicercaService } from './ricerca.service';
import { RicercaController } from './ricerca.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RicercaController],
  providers: [RicercaService, PrismaService],
})
export class RicercaModule {}
