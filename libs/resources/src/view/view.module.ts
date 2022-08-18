import { Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { VideoModule } from '../video';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [DatabaseModule, VideoModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService],
})
export class ViewModule {}
