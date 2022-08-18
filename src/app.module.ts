import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '@rms/auth';
import { AppConfigModule } from '@rms/config/app-config.module';
import { FileLoaderService } from '@rms/file-loader';
import { ResourcesModule } from '@rms/resources';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoFinderService } from './video-finder/video-finder.service';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    ResourcesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    VideoFinderService, // Required or the scheduled task won't run
    FileLoaderService,
  ],
})
export class AppModule {}
