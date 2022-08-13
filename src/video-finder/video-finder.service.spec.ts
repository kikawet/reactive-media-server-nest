import { Test, TestingModule } from '@nestjs/testing';
import { FileLoaderModule } from 'rms/file-loader';
import { AppConfigModule } from '../config/app-config.module';
import { VideoModule } from '../video/video.module';
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
