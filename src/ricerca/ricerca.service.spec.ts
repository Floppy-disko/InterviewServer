import { Test, TestingModule } from '@nestjs/testing';
import { RicercaService } from './ricerca.service';

describe('RicercaService', () => {
  let service: RicercaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RicercaService],
    }).compile();

    service = module.get<RicercaService>(RicercaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
