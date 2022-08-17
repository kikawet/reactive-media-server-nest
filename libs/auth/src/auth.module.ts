import { Module } from '@nestjs/common';
import { UserModule } from '@rms/resources/user';
import { AuthService } from './auth.service';
import { EncryptionModule } from './encryption/encryption.module';
import { BasicStrategy } from './strategies/basic.strategy';

@Module({
  imports: [EncryptionModule, UserModule],
  providers: [AuthService, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}
