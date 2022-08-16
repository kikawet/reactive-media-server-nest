import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '@rms/config/app-config.module';
import { FileLoaderModule } from '@rms/file-loader';
import { VideoModule } from '@rms/resources/video';
import { VideoFinderService } from './video-finder.service';

describe('VideoFinderService', () => {
  let service: VideoFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FileLoaderModule, AppConfigModule, VideoModule],
      providers: [VideoFinderService],
    }).compile();

    service = module.get<VideoFinderService>(VideoFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
