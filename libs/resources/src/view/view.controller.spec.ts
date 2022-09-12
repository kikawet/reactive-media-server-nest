import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@rms/database';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

const moduleMocker = new ModuleMocker(global);

describe('ViewController', () => {
  let controller: ViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ViewController],
      providers: [ViewService],
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

    controller = module.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
