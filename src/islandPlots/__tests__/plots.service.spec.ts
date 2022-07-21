import { Test, TestingModule } from '@nestjs/testing';
import { IslandPlotsService } from '../islandPlots.service';

describe('PlotsService', () => {
  let service: IslandPlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IslandPlotsService],
    }).compile();

    service = module.get<IslandPlotsService>(IslandPlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
