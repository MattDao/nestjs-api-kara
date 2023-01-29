import { Test, TestingModule } from '@nestjs/testing';
import { CampagnesService } from './campagnes.service';

describe('CampagnesService', () => {
  let service: CampagnesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampagnesService],
    }).compile();

    service = module.get<CampagnesService>(CampagnesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
