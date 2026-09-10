import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UtenteModule } from './utente/utente.module';

@Module({
  imports: [ConfigModule.forRoot(), UtenteModule],
  //controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
