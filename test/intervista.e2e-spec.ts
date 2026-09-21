import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/prisma.service.js';

describe('IntervistaController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const suffix = Date.now();
  const candidatoEmail = `intervista-candidato-e2e-${suffix}@example.com`;
  const intervistatoreEmail = `intervista-intervistatore-e2e-${suffix}@example.com`;
  const descrizione = `intervista-ricerca-e2e-${suffix}`;

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
    await prisma.intervista.deleteMany({
      where: {
        ricerca: { descrizione },
      },
    });
    await prisma.ricerca.deleteMany({ where: { descrizione } });
    await prisma.utente.deleteMany({
      where: { email: { in: [candidatoEmail, intervistatoreEmail] } },
    });
    await app.close();
  });

  it('creates, reads, updates, and deletes an intervista with an existing ricerca', async () => {
    const candidatoResponse = await request(app.getHttpServer())
      .post('/utente')
      .send({
        email: candidatoEmail,
        nome: 'Candidato',
        cognome: 'E2E',
      })
      .expect(201);
    const candidatoId = candidatoResponse.body.id as number;

    const intervistatoreResponse = await request(app.getHttpServer())
      .post('/utente')
      .send({
        email: intervistatoreEmail,
        nome: 'Intervistatore',
        cognome: 'E2E',
      })
      .expect(201);
    const intervistatoreId = intervistatoreResponse.body.id as number;

    const ricercaResponse = await request(app.getHttpServer())
      .post('/ricerca')
      .send({ descrizione, stato: 'attiva' })
      .expect(201);
    const ricercaId = ricercaResponse.body.id as number;

    const inizio = '2030-01-15T09:00:00.000Z';
    const fine = '2030-01-15T10:00:00.000Z';
    const createResponse = await request(app.getHttpServer())
      .post('/intervista')
      .send({
        inizio,
        fine,
        stato: 'programmata',
        candidato: candidatoId,
        intervistatori: [intervistatoreId],
        ricerca: ricercaId,
      })
      .expect(201);

    expect(createResponse.body).toMatchObject({
      stato: 'programmata',
      candidato: candidatoId,
      intervistatori: [intervistatoreId],
      ricerca: ricercaId,
    });
    expect(createResponse.body.id).toEqual(expect.any(Number));
    const id = createResponse.body.id as number;

    await request(app.getHttpServer())
      .get(`/intervista/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, candidato: candidatoId });
      });

    await request(app.getHttpServer())
      .patch(`/intervista/${id}`)
      .send({ stato: 'completata' })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id, stato: 'completata' });
      });

    await request(app.getHttpServer())
      .get('/intervista')
      .query(`ricerca=${ricercaId}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.some((intervista: { id: number }) => intervista.id === id)).toBe(
          true,
        );
      });

    await request(app.getHttpServer())
      .delete(`/intervista/${id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toMatchObject({ id });
      });

    await request(app.getHttpServer()).get(`/intervista/${id}`).expect(404);
  });

  it('rejects an interview that references a missing ricerca', async () => {
    await request(app.getHttpServer())
      .post('/intervista')
      .send({
        inizio: '2030-01-16T09:00:00.000Z',
        fine: '2030-01-16T10:00:00.000Z',
        candidato: 999999,
        intervistatori: [999998],
        ricerca: 999997,
      })
      .expect(404);
  });
});