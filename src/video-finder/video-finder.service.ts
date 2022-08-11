import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { join, parse } from 'path';
import { FileLoaderService } from 'rms/file-loader';
import { CreateVideoDto } from 'src/video/dto/create-video.dto';
import { VideoService } from 'src/video/video.service';

@Injectable()
export class VideoFinderService {
  private readonly logger = new Logger(VideoFinderService.name);
  private static runningSearch = false;

  constructor(
    private readonly fileLoader: FileLoaderService,
    private readonly config: ConfigService,
    private readonly videoService: VideoService,
  ) {}

  @Cron(CronExpression.EVERY_WEEK) // TODO: Replace cron with watch file
  async handleCron() {
    if (VideoFinderService.runningSearch) return;

    VideoFinderService.runningSearch = true;

    try {
      const scanPath = this.config.get('VIDEO_SCANPATH');
      const files = await this.fileLoader.scanFolder(scanPath);

      const videos: CreateVideoDto[] = files.map((fileName) => {
        return { title: parse(fileName).name, url: join(scanPath, fileName) };
      });

      const result = await this.videoService.createVideos(videos);

      if (result.count > 0) {
        this.logger.debug(`Inserted ${result.count} videos`);
      } else {
        this.logger.verbose(`No videos were added`);
      }
    } catch (error) {
      this.logger.error(`Error while scanning for videos ${error}`);
    } finally {
      VideoFinderService.runningSearch = false;
    }
  }
}
