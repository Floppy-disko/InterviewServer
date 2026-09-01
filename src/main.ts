import { NestFactory } from '@nestjs/core';
//import { AppModule } from './app.module';
import { UtenteModule } from './utente/utente.module';

async function bootstrap() {
  const app = await NestFactory.create(UtenteModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
