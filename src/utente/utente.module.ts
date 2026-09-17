import { Module } from '@nestjs/common';
import { UtenteService } from './utente.service.js';
import { UtenteController } from './utente.controller.js';

@Module({
  controllers: [UtenteController],
  providers: [UtenteService],
})
export class UtenteModule {}
