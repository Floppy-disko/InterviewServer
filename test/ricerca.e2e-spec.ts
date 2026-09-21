import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { PrismaService } from '../src/prisma.service.js';
import { createE2eApp } from './e2e-app.js';

describe('RicercaController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;
  const descrizione = `ricerca-e2e-${Date.now()}`;
  const selezionatoEmail = `ricerca-selezionato-e2e-${Date.now()}@example.com`;

  beforeAll(async () => {
    ({ app, prisma } = await createE2eApp());

    await request(app.getHttpServer())
      .post('/utente')
      .send({
        email: selezionatoEmail,
        nome: 'Selezionato',
        cognome: 'E2E',
      })
      .expect(201);
  });

  afterAll(async () => {
    await prisma.ricerca.deleteMany({ where: { descrizione } });
    await prisma.utente.deleteMany({ where: { email: selezionatoEmail } });
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

    const utente = await prisma.utente.findUniqueOrThrow({
      where: { email: selezionatoEmail },
      select: { id: true },
    });

    await request(app.getHttpServer())
      .post(`/ricerca/${id}/selezionato`)
      .send({ utenteId: utente.id })
      .expect(201)
      .expect(({ body }) => {
        expect(body.selezionati).toContain(utente.id);
      });

    await request(app.getHttpServer())
      .delete(`/ricerca/${id}/selezionato/${utente.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.selezionati).not.toContain(utente.id);
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
      .send({ stato: 'attiva' })
      .expect(400);
  });
});