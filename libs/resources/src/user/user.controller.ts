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
import { User as UserModel, View as ViewModel } from '@prisma/client';
import { ViewService } from '@rms/resources/view';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly viewService: ViewService,
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
  async create(@Body() user: CreateUserDto): Promise<UserModel> {
    const dbUser = await this.userService.user({
      login: user.login,
    });

    if (dbUser !== null) {
      throw new HttpException(dbUser, HttpStatus.CONFLICT);
    }

    return this.userService.createUser(user);
  }
}
