import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video as VideoModel } from '@prisma/client';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getAll(): Promise<VideoModel[]> {
    return this.videoService.videos({});
  }
}
