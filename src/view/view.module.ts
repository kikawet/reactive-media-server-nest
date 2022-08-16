import { Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService],
})
export class ViewModule {}
