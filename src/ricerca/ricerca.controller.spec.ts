import { Test, TestingModule } from '@nestjs/testing';
import { RicercaController } from './ricerca.controller';
import { RicercaService } from './ricerca.service';

describe('RicercaController', () => {
  let controller: RicercaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RicercaController],
      providers: [RicercaService],
    }).compile();

    controller = module.get<RicercaController>(RicercaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
