import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@rms/database';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

describe('ViewController', () => {
  let controller: ViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ViewController],
      providers: [ViewService],
    }).compile();

    controller = module.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
