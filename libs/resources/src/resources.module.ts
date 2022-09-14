import { Module } from '@nestjs/common';
import { UserModule } from './user';
import { VideoModule } from './video';
import { ViewModule } from './view';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [UserModule, VideoModule, ViewModule, SuggestionModule],
  exports: [UserModule, VideoModule, ViewModule],
})
export class ResourcesModule {}
