import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from '@rms/config/app-config.module';
import { FileLoaderModule } from '@rms/file-loader';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { VideoFinderService } from './video-finder.service';

const moduleMocker = new ModuleMocker(global);

describe('VideoFinderService', () => {
  let service: VideoFinderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FileLoaderModule, AppConfigModule],
      providers: [VideoFinderService],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<VideoFinderService>(VideoFinderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
