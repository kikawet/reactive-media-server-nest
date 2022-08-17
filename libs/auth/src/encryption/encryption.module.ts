import { Module } from '@nestjs/common';
import { AppConfigModule } from '@rms/config';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [AppConfigModule],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
