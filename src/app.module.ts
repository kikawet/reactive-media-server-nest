import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';
@Module({
  imports: [ConfigModule.forRoot(), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
