import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseArrayPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Video as VideoModel } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { createReadStream } from 'fs';
import { lookup } from 'mime-types';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  private readonly logger = new Logger(VideoController.name);

  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAll(): Promise<VideoModel[]> {
    return this.videoService.videos({ take: 20 });
  }

  @Get(':title')
  async getVideoByTitle(
    @Param('title') title: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const video = await this.videoService.video({
      title,
    });

    if (video === null) {
      throw new HttpException(
        `Video with title '${title}' not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (video.isPrivate) {
      throw new HttpException(
        `Video with title '${title}' is private`,
        HttpStatus.FORBIDDEN,
      );
    }

    const rx = createReadStream(video.url);
    const responseMimeType = lookup(video.url);
    if (responseMimeType) res.header('Content-Type', responseMimeType);

    return rx;
  }

  @Post()
  createMany(
    @Body(
      new ParseArrayPipe({
        items: CreateVideoDto,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    )
    videoArray: CreateVideoDto[],
  ) {
    return this.videoService.createVideos(videoArray).then((payload) => {
      return { added: payload.count };
    });
  }
}
