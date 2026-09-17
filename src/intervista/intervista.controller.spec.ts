import { Test, TestingModule } from '@nestjs/testing';
import { IntervistaController } from './intervista.controller.js';
import { IntervistaService } from './intervista.service.js';

describe('IntervistaController', () => {
  let controller: IntervistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntervistaController],
      providers: [IntervistaService],
    }).compile();

    controller = module.get<IntervistaController>(IntervistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
