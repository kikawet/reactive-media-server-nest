import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FileLoaderService } from 'rms/file-loader';
import { CreateVideoDto } from '../video/dto/create-video.dto';
import { VideoService } from '../video/video.service';

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
      const files = await this.fileLoader.advancedScanFolder(scanPath);

      const videos: CreateVideoDto[] = files.map((videoMeta) => {
        return {
          title: videoMeta.name,
          url: videoMeta.fullPath,
          duration: videoMeta.duration,
        };
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
