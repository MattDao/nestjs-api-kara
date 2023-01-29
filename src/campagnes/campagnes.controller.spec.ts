import { Test, TestingModule } from '@nestjs/testing';
import { CampagnesController } from './campagnes.controller';
import { CampagnesService } from './campagnes.service';

describe('CampagnesController', () => {
  let controller: CampagnesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampagnesController],
      providers: [CampagnesService],
    }).compile();

    controller = module.get<CampagnesController>(CampagnesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
