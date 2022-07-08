import { Test, TestingModule } from '@nestjs/testing';
import { IslandPlotsController } from './islandPlots.controller';

describe('PlotsController', () => {
  let controller: IslandPlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IslandPlotsController],
    }).compile();

    controller = module.get<IslandPlotsController>(IslandPlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
