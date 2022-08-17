import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionModule } from '@rms/auth/encryption';
import { DatabaseService } from '@rms/database';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { ViewModule } from '../view/view.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ViewModule, EncryptionModule],
      controllers: [UserController],
      providers: [UserService],
    })
      .useMocker((token) => {
        if (token === DatabaseService) {
          return {
            user: {
              create: jest
                .fn()
                .mockImplementation((u: CreateUserDto): UserDto => {
                  const { password, ...result } = u;
                  return result;
                }),
              findUnique: jest.fn().mockResolvedValue(null),
            },
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not return password', async () => {
    const inputUser: CreateUserDto = {
      login: 'test',
      password: 'secret',
    };

    const resultUser: any = await controller.create(inputUser);

    expect(resultUser).toBeDefined();
    expect(resultUser.password).toBeUndefined();
  });
});
