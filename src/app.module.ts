import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app-config.module';
import { VideoModule } from './video/video.module';
@Module({
  imports: [AppConfigModule, ScheduleModule.forRoot(), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
