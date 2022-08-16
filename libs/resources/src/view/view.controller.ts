import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { View as ViewModel } from '@prisma/client';
import { CreateViewDto } from './dto/create-view.dto';
import { ViewService } from './view.service';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  async create(@Body() view: CreateViewDto): Promise<ViewModel> {
    const { completionPercentage, timestamp, userLogin, videoTitle } = view;

    const dbView = await this.viewService.view({
      userLogin_videoTitle_timestamp: {
        userLogin,
        videoTitle,
        timestamp,
      },
    });

    if (dbView !== null) {
      throw new HttpException(dbView, HttpStatus.CONFLICT);
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
