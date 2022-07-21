import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { IslandsController } from '../islands.controller';
import { IslandsService } from '../islands.service';

describe('IslandsController', () => {
  let controller: IslandsController;
  const mockIslandService = {
    getIslands: jest.fn(() => ({ islands: [] })),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IslandsController],
      providers: [IslandsService],
    })
      .overrideProvider(IslandsService)
      .useValue(mockIslandService)
      .compile();
    controller = module.get<IslandsController>(IslandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return islands', () => {
    const mockRequest = {} as unknown as Request;
    const mockResponse = {
      status: jest.fn((x) => mockResponse),
      json: jest.fn((x) => x),
    } as unknown as Response;
    //TODO: write test to getIslands() it is broken rn.
    expect(controller.getIslands()).toEqual({
      islands: expect.any(Array),
    });
    expect(mockIslandService.getIslands).toHaveBeenCalledWith();
  });
});
