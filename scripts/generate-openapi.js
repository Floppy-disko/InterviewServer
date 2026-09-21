import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'node:fs/promises';
import { AppModule } from '../dist/app.module.js';

async function generate() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('IntervistaServer API')
    .setDescription(
      'API specification for IntervistaServer: candidate management, recruitment searches, and conflict-validated interview scheduling.',
    )
    .setVersion('1.0')
    .addTag('Utenti', 'Operations with users, candidates, and interviewers')
    .addTag('Ricerche', 'Recruitment campaigns and selected candidate assignments')
    .addTag('Interviste', 'Interview scheduling with schedule collision detection')
    .addTag('System', 'Health and database maintenance utilities')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  await fs.writeFile('openapi.json', JSON.stringify(document, null, 2), 'utf-8');
  console.log('Successfully generated openapi.json');
  await app.close();
  process.exit(0);
}

generate().catch((err) => {
  console.error('Error generating OpenAPI specification:', err);
  process.exit(1);
});

