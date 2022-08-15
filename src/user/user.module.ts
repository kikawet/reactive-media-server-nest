import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ViewModule } from '../view/view.module';

@Module({
  imports: [PrismaModule, ViewModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
