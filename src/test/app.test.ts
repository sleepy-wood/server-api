import { Test, TestingModule } from '@nestjs/testing';
import { ClusterService } from '../services';

describe('ApiService', () => {
  let service: ClusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClusterService],
    }).compile();

    service = module.get<ClusterService>(ClusterService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });
});
