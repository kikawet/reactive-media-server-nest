import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync(process.env.KEY ?? ''),
    cert: readFileSync(process.env.CRT ?? ''),
  };

  const enableHTTP2 = (process.env.HTTP2 ?? 'true').toLowerCase() == 'true';

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      https: httpsOptions,
      ...(enableHTTP2 ? { http2: true } : null),
    }),
  );

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  Logger.log(`🚀 Application is running on: https://localhost:${port}`);
}
bootstrap();
