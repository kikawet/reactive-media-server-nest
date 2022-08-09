import { Body, Controller, Get, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video as VideoModel } from '@prisma/client';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAll(): Promise<VideoModel[]> {
    return this.videoService.videos({});
  }

  @Post()
  createMany(@Body() videoArray: VideoModel[]) {
    return this.videoService.createVideos(videoArray).then((payload) => {
      return { added: payload.count };
    });
  }
}
