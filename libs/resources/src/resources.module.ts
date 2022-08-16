import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { VideoModule } from './video';
import { ViewModule } from './view';

@Module({
  imports: [UserModule, VideoModule, ViewModule],
  exports: [UserModule, VideoModule, ViewModule],
})
export class ResourcesModule {}
