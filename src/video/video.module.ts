import { Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
