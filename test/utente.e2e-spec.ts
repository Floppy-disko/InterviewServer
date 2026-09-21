import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma.service.js';

describe('UtenteController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const email = `utente-e2e-${Date.now()}@example.com`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await prisma.utente.deleteMany({ where: { email } });
    await app.close();
  });

  it('creates, reads, updates, and deletes an utente over HTTP', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/utente')
      .send({
        email,
        nome: 'Ada',
        cognome: 'Lovelace',
        ruolo: 'candidata',
      })
      .expect(201);

    expect(createResponse.body).toMatchObject({
      email,
      nome: 'Ada',
      cognome: 'Lovelace',
      ruolo: 'candidata',
      intervisteRicevute: [],
      intervisteEffettuate: [],
    });
    expect(createResponse.body.id).toEqual(expect.any(Number));
    const id = createResponse.body.id as number;

    await request(app.getHttpServer())
      .get(`/utente/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, email, nome: 'Ada' });
      });

    await request(app.getHttpServer())
      .patch(`/utente/${id}`)
      .send({ nome: 'Augusta' })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, email, nome: 'Augusta' });
      });

    await request(app.getHttpServer())
      .get('/utente')
      .query(`email=${encodeURIComponent(email)}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0]).toMatchObject({ id, nome: 'Augusta', email });
      });

    await request(app.getHttpServer())
      .delete(`/utente/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, email });
      });

    await request(app.getHttpServer()).get(`/utente/${id}`).expect(404);
  });

  it('rejects an invalid create request', async () => {
    await request(app.getHttpServer())
      .post('/utente')
      .send({ email: 'not-an-email', nome: 42 })
      .expect(400);
  });
});