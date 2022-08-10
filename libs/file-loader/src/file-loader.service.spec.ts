import { Test, TestingModule } from '@nestjs/testing';
import { FileLoaderService } from './file-loader.service';

describe('FileLoaderService', () => {
  let service: FileLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileLoaderService],
    }).compile();

    service = module.get<FileLoaderService>(FileLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load files', async () => {
    const files = await service.scanFolder('.');

    expect(files.length).toBeGreaterThan(0);
  });
});
