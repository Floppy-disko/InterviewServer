import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma.service.js';

describe('RicercaController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const descrizione = `ricerca-e2e-${Date.now()}`;

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
    await prisma.ricerca.deleteMany({ where: { descrizione } });
    await app.close();
  });

  it('creates, reads, updates, and deletes a ricerca over HTTP', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/ricerca')
      .send({ descrizione, stato: 'attiva' })
      .expect(201);

    expect(createResponse.body).toMatchObject({
      descrizione,
      stato: 'attiva',
      interviste: [],
      selezionati: [],
    });
    expect(createResponse.body.id).toEqual(expect.any(Number));
    const id = createResponse.body.id as number;

    await request(app.getHttpServer())
      .get(`/ricerca/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, descrizione, stato: 'attiva' });
      });

    await request(app.getHttpServer())
      .patch(`/ricerca/${id}`)
      .send({ stato: 'chiusa' })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, descrizione, stato: 'chiusa' });
      });

    await request(app.getHttpServer())
      .get('/ricerca')
      .query(`stato=chiusa`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.some((ricerca: { id: number }) => ricerca.id === id)).toBe(
          true,
        );
      });

    await request(app.getHttpServer())
      .delete(`/ricerca/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, descrizione });
      });

    await request(app.getHttpServer()).get(`/ricerca/${id}`).expect(404);
  });

  it('rejects an invalid create request', async () => {
    await request(app.getHttpServer())
      .post('/ricerca')
      .send({ descrizione: 42 })
      .expect(400);
  });
});