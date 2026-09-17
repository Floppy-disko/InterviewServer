import { IntervistaMapper } from './intervista.mapper';

describe('IntervistaMapper', () => {
  let mapper: IntervistaMapper;

  const inizio = new Date('2026-09-17T09:00:00.000Z');
  const fine = new Date('2026-09-17T10:00:00.000Z');

  const intervista = {
    id: 1,
    inizio,
    fine,
    stato: 'programmata',
    candidato: { id: 2, nome: 'Ada', cognome: 'Lovelace' },
    intervistatori: [
      { id: 3, nome: 'Grace', cognome: 'Hopper' },
      { id: 4, nome: 'Alan', cognome: 'Turing' },
    ],
    ricerca: { id: 5 },
  };

  beforeEach(() => {
    mapper = new IntervistaMapper();
  });

  describe('modelToDto', () => {
    it('maps the interview and its relations to a response DTO', () => {
      expect(mapper.modelToDto(intervista)).toEqual({
        id: 1,
        stato: 'programmata',
        inizio,
        fine,
        candidato: { id: 2, nome: 'Ada', cognome: 'Lovelace' },
        intervistatori: [
          { id: 3, nome: 'Grace', cognome: 'Hopper' },
          { id: 4, nome: 'Alan', cognome: 'Turing' },
        ],
        ricerca: { id: 5 },
      });
    });
  });

  describe('modelToPartialDto', () => {
    it('maps only the fields and relations that are present', () => {
      expect(
        mapper.modelToPartialDto({
          stato: 'completata',
          candidato: intervista.candidato,
          ricerca: intervista.ricerca,
        }),
      ).toEqual({
        stato: 'completata',
        candidato: { id: 2, nome: 'Ada', cognome: 'Lovelace' },
        ricerca: { id: 5 },
      });
    });
  });

  describe('createDtoToModel', () => {
    it('converts relation ids into Prisma connect inputs', () => {
      expect(
        mapper.createDtoToModel({
          inizio,
          fine,
          stato: 'programmata',
          candidato: 2,
          intervistatori: [3, 4],
          ricerca: 5,
        }),
      ).toEqual({
        inizio,
        fine,
        stato: 'programmata',
        candidato: { connect: { id: 2 } },
        intervistatori: { connect: [{ id: 3 }, { id: 4 }] },
        ricerca: { connect: { id: 5 } },
      });
    });
  });

  describe('listParamsDtoToModel', () => {
    it('converts filters and pagination into a Prisma query', () => {
      expect(
        mapper.listParamsDtoToModel({
          skip: 10,
          take: 5,
          id: [1, 2],
          before: fine,
          after: inizio,
          stato: ['programmata'],
          candidato: [2],
          intervistatori: [3, 4],
          ricerca: [5],
        }),
      ).toEqual({
        skip: 10,
        take: 5,
        select: {
          id: true,
          inizio: true,
          fine: true,
          stato: true,
          candidato: true,
          intervistatori: true,
          ricerca: true,
        },
        where: {
          AND: [
            { id: { in: [1, 2] } },
            { inizio: { gt: inizio } },
            { fine: { lt: fine } },
            { stato: { in: ['programmata'] } },
            { candidato: { id: { in: [2] } } },
            { intervistatori: { some: { id: { in: [3, 4] } } } },
            { ricerca: { id: { in: [5] } } },
          ],
        },
      });
    });

    it('disables excluded fields in the select clause', () => {
      expect(
        mapper.listParamsDtoToModel({
          exclude: ['id', 'candidato', 'ricerca'],
        }),
      ).toEqual({
        select: {
          id: false,
          inizio: true,
          fine: true,
          stato: true,
          candidato: false,
          intervistatori: true,
          ricerca: false,
        },
        where: {
          AND: [
            { id: undefined },
            { inizio: undefined },
            { fine: undefined },
            { stato: undefined },
            { candidato: undefined },
            { intervistatori: undefined },
            { ricerca: undefined },
          ],
        },
      });
    });
  });

  describe('updateDtoToModel', () => {
    it('maps supplied scalar fields and relation changes', () => {
      expect(
        mapper.updateDtoToModel({
          stato: 'completata',
          candidato: 2,
          intervistatori: [3, 4],
          ricerca: 5,
        }),
      ).toEqual({
        stato: 'completata',
        candidato: { connect: { id: 2 } },
        intervistatori: { set: [{ id: 3 }, { id: 4 }] },
        ricerca: { connect: { id: 5 } },
      });
    });

    it('does not include omitted relation updates', () => {
      expect(mapper.updateDtoToModel({ stato: 'annullata' })).toEqual({
        stato: 'annullata',
      });
    });
  });
});