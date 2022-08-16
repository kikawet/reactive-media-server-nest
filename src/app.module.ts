import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FileLoaderService } from '@rms/file-loader';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '@rms/config/app-config.module';
import { VideoFinderService } from './video-finder/video-finder.service';
import { VideoModule } from './video/video.module';
import { ViewModule } from './view/view.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AppConfigModule,
    ScheduleModule.forRoot(),
    VideoModule,
    UserModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    VideoFinderService, // Required or the scheduled task won't run
    FileLoaderService,
  ],
})
export class AppModule {}
