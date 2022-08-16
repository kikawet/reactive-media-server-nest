import { Module } from '@nestjs/common';
import { DatabaseModule } from '@rms/database';
import { ViewModule } from '../view/view.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, ViewModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
