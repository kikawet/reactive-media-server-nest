import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
