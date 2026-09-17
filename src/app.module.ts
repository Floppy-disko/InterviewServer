import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UtenteModule } from './utente/utente.module.js';

@Module({
  imports: [UtenteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
