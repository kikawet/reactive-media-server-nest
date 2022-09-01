import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
  Request,
} from '@nestjs/common';
import { View as ViewModel } from '@prisma/client';
import { AuthenticatedRequest } from '@rms/auth/dto';
import { VideoService } from '../video';
import { CreateViewDto } from './dto/create-view.dto';
import { ViewService } from './view.service';

@Controller('view')
export class ViewController {
  constructor(
    private readonly viewService: ViewService,
    private readonly videoService: VideoService,
  ) {}

  @Post()
  async create(
    @Request() { user }: AuthenticatedRequest,
    @Body() view: CreateViewDto,
  ): Promise<ViewModel> {
    const { completionPercentage, userLogin, videoTitle } = view;
    let { timestamp } = view;
    timestamp ??= new Date(new Date().toISOString());

    // TODO: when user.isAdmin check if userLogin is in the dataBase
    if (
      !user.isAdmin &&
      (userLogin !== user.login ||
        !(await this.videoService.isUserAllowed(userLogin, videoTitle)))
    ) {
      throw new ForbiddenException();
    }

    const dbView = await this.viewService.view({
      userLogin_videoTitle_timestamp: {
        userLogin,
        videoTitle,
        timestamp,
      },
    });

    if (dbView !== null) {
      throw new ConflictException(dbView);
    }

    return this.viewService.createView({
      user: {
        connect: {
          login: userLogin,
        },
      },
      video: {
        connect: {
          title: videoTitle,
        },
      },
      timestamp,
      completionPercentage,
    });
  }
}
