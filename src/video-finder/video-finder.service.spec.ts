import { Test, TestingModule } from '@nestjs/testing';
import { VideoFinderService } from './video-finder.service';

describe('VideoFinderService', () => {
  let service: VideoFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoFinderService],
    }).compile();

    service = module.get<VideoFinderService>(VideoFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
