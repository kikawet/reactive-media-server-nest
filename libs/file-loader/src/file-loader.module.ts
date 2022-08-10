import { Module } from '@nestjs/common';
import { FileLoaderService } from './file-loader.service';

@Module({
  providers: [FileLoaderService],
  exports: [FileLoaderService],
})
export class FileLoaderModule {}
