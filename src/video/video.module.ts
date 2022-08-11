import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [PrismaModule],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
