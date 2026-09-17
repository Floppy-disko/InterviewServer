import { Test, TestingModule } from '@nestjs/testing';
import { UtenteController } from './utente.controller.js';
import { UtenteService } from './utente.service.js';

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
