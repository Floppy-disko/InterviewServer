import { Module } from '@nestjs/common';
import { RicercaService } from './ricerca.service.js';
import { RicercaController } from './ricerca.controller.js';

@Module({
  controllers: [RicercaController],
  providers: [RicercaService],
})
export class RicercaModule {}
