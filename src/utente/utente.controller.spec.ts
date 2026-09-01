import { Test, TestingModule } from '@nestjs/testing';
import { UtenteController } from './utente.controller';
import { UtenteService } from './utente.service';

describe('UtenteController', () => {
  let controller: UtenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtenteController],
      providers: [UtenteService],
    }).compile();

    controller = module.get<UtenteController>(UtenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
