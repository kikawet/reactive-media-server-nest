import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { View as ViewModel } from '@prisma/client';
import { AuthenticatedRequest } from '@rms/auth/dto';
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
  getHistoryByLogin(
    @Param('login') login: string,
    @Request() { user }: AuthenticatedRequest,
  ): Promise<ViewModel[]> {
    if (!user.isAdmin && login !== user.login) {
      throw new ForbiddenException();
    }

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
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body() newUser: CreateUserDto,
  ): Promise<UserDto> {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }

    const dbUser = await this.userService.user({
      login: newUser.login,
    });

    if (dbUser !== null) {
      throw new ConflictException(dbUser);
    }

    const hashPass = await this.encryptionService.hash(newUser.password);

    return this.userService.createUser({
      login: newUser.login,
      password: hashPass,
    });
  }
}
