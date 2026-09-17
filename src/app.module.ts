import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UtenteModule } from './utente/utente.module.js';
import { IntervistaModule } from './intervista/intervista.module.js';
import { RicercaModule } from './ricerca/ricerca.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UtenteModule, IntervistaModule, RicercaModule],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
