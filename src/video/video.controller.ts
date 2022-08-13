import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { Video as VideoModel } from '@prisma/client';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAll(): Promise<VideoModel[]> {
    return this.videoService.videos({});
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
