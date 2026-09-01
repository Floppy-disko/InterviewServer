import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { UtenteController } from './utente.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UtenteController],
  providers: [UtenteService, PrismaService],
})
export class UtenteModule {}
