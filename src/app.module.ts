import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';
import { ScheduleModule } from '@nestjs/schedule';
import { validationSchema } from './config/schema';
@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema }),
    ScheduleModule.forRoot(),
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
