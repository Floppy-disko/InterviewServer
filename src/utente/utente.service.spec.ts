import { Test, TestingModule } from '@nestjs/testing';
import { UtenteService } from './utente.service.js';

describe('UtenteService', () => {
  let service: UtenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtenteService],
    }).compile();

    service = module.get<UtenteService>(UtenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
