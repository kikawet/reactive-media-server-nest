import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [PrismaModule],
  controllers: [ViewController],
  providers: [ViewService],
  exports: [ViewService],
})
export class ViewModule {}
