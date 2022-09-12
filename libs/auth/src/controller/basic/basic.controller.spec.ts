import { forwardRef } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '@rms/auth';
import { BasicController } from './basic.controller';

describe('BasicController', () => {
  let controller: BasicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [BasicController],
    }).compile();

    controller = module.get<BasicController>(BasicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
