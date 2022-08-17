import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
