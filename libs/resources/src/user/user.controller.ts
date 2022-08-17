import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { View as ViewModel } from '@prisma/client';
import { EncryptionService } from '@rms/auth/encryption';
import { ViewService } from '@rms/resources/view';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly viewService: ViewService,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Get(':login/history')
  getHistoryByLogin(@Param('login') login: string): Promise<ViewModel[]> {
    return this.viewService.views({
      where: {
        userLogin: login,
      },
      select: {
        videoTitle: true,
        timestamp: true,
        completionPercentage: true,
      },
    });
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    const dbUser = await this.userService.user({
      login: user.login,
    });

    if (dbUser !== null) {
      throw new HttpException(dbUser, HttpStatus.CONFLICT);
    }

    const hashPass = await this.encryptionService.hash(user.password);

    return this.userService.createUser({
      login: user.login,
      password: hashPass,
    });
  }
}
