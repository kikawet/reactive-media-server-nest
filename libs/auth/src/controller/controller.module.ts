import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '..';
import { BasicController } from './basic/basic.controller';
import { DiscordController } from './discord/discord.controller';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [BasicController, DiscordController],
})
export class ControllerModule {}
