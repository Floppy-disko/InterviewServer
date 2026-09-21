import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'types/supertest';
import { createE2eApp } from './e2e-app.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    ({ app } = await createE2eApp());
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
