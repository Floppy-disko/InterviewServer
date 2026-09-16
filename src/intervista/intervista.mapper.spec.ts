import { IntervistaMapper } from './intervista.mapper';
import { IntervistaListParamsDto } from './dto/intervista-list-params.dto';

describe('IntervistaMapper', () => {
  let mapper: IntervistaMapper;

  beforeEach(() => {
    mapper = new IntervistaMapper();
  });

  it('maps list filters, pagination, relations, and excluded fields', () => {
    const after = new Date('2026-09-16T09:00:00.000Z');
    const before = new Date('2026-09-16T17:00:00.000Z');
    const params: IntervistaListParamsDto = {
      skip: 10,
      take: 20,
      id: [1, 2],
      after,
      before,
      stato: ['programmata'],
      candidato: [3],
      intervistatori: [4, 5],
      ricerca: [6],
      exclude: ['fine', 'ricerca'],
    };

    expect(mapper.listParamsDtoToModel(params)).toEqual({
      skip: 10,
      take: 20,
      select: {
        id: true,
        inizio: true,
        fine: false,
        stato: true,
        candidato: true,
        intervistatori: true,
        ricerca: false,
      },
      where: {
        AND: [
          { id: { in: [1, 2] } },
          { inizio: { gt: after } },
          { fine: { lt: before } },
          { stato: { in: ['programmata'] } },
          { candidato: { id: { in: [3] } } },
          { intervistatori: { some: { id: { in: [4, 5] } } } },
          { ricerca: { id: { in: [6] } } },
        ],
      },
    });
  });

  it('leaves optional filters inactive when they are omitted', () => {
    expect(mapper.listParamsDtoToModel({})).toEqual({
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