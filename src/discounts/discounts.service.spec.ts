import { Test, TestingModule } from '@nestjs/testing';
import { DiscountsService } from './discounts.service';

describe('DiscountsService', () => {
  let service: DiscountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountsService],
    }).compile();

    service = module.get<DiscountsService>(DiscountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
