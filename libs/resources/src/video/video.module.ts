import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { UserModule } from '../user';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
