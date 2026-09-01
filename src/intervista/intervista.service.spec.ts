import { Test, TestingModule } from '@nestjs/testing';
import { IntervistaService } from './intervista.service';

describe('IntervistaService', () => {
  let service: IntervistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntervistaService],
    }).compile();

    service = module.get<IntervistaService>(IntervistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
