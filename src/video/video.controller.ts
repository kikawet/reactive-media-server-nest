import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video as VideoModel } from '@prisma/client';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAll(): Promise<VideoModel[]> {
    return this.videoService.videos({});
  }

  @Post()
  createMany(
    @Body(new ParseArrayPipe({ items: CreateVideoDto }))
    videoArray: CreateVideoDto[],
  ) {
    return this.videoService.createVideos(videoArray).then((payload) => {
      return { added: payload.count };
    });
  }
}
