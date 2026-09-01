import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service';
import { UtenteController } from './utente.controller';

@Module({
  controllers: [UtenteController],
  providers: [UtenteService],
})
export class UtenteModule {}
