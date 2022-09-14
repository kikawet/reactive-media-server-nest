import { Module } from '@nestjs/common';
import { EncryptionModule } from '@rms/auth/encryption';
import { DatabaseModule } from '@rms/database';
import { SuggestionModule } from '../suggestion/suggestion.module';
import { ViewModule } from '../view/view.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, ViewModule, SuggestionModule, EncryptionModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
