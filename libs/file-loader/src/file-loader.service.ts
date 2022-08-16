import { Injectable } from '@nestjs/common';
import * as ffprobe from 'ffprobe';
import * as ffprobeStatic from 'ffprobe-static';
import { PathLike } from 'fs';
import { readdir } from 'fs/promises';
import { join, parse } from 'path';
import { VideoMetadaDto } from './dto/video-metadata.dto';

@Injectable()
export class FileLoaderService {
  scanFolder(path: PathLike): Promise<string[]> {
    return readdir(path);
  }

  /**
   * Scan a folder searching for files with all the metadata required to generate a VideoMetadaDto. If unable to get some of the values the file is ignored.
   * @param path Scan the folder searching for the metadata in the VideoMetadaDto
   * @returns Array with the VideoMetadaDto found in the folder at {path}
   */
  async advancedScanFolder(path: PathLike): Promise<VideoMetadaDto[]> {
    const pathStr = path.toString();
    const files = await this.scanFolder(path);

    const videos = await Promise.all(
      files
        .map((filename) => {
          const fullPath = join(pathStr, filename);
          return {
            ...parse(fullPath),
            fullPath,
            duration: -1,
          };
        })
        .map(async (meta) => {
          let result;
          try {
            result = await ffprobe(meta.fullPath, {
              path: ffprobeStatic.path,
            });
          } catch (error) {
            return meta;
          }

          const duration = result.streams[0].tags?.DURATION;
          if (duration == undefined) return meta;

          const seconds = this.getSeconds(duration);

          meta.duration = seconds;

          return meta;
        }),
    );

    return videos.filter((meta) => meta.duration > 0);
  }

  /**
   * Calculate the number of seconds
   * @param duration with format HH:MM:SS.SSS. If undefined will return -1
   */
  private getSeconds(duration: string): number {
    return duration
      .slice(0, 8)
      .split(':')
      .reduce((acc, time) => 60 * acc + +time, 0);
  }
}
