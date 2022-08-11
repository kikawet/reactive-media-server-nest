import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './schema';

@Module({
  imports: [ConfigModule.forRoot({ validationSchema })],
})
export class AppConfigModule {}
