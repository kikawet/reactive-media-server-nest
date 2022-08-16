import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfigModule } from '@rms/config/app-config.module';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

declare const module: any;

async function bootstrap() {
  const configApp = await NestFactory.create<NestFastifyApplication>(
    AppConfigModule,
    new FastifyAdapter(),
  );

  const configService = configApp.get(ConfigService);

  const isHTTPS =
    configService.get('KEY') != undefined &&
    configService.get('CRT') != undefined;

  const httpsOptions = isHTTPS
    ? {
        key: readFileSync(configService.getOrThrow('KEY')),
        cert: readFileSync(configService.getOrThrow('CRT')),
      }
    : {};

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      https: httpsOptions,
      ...(configService.get('HTTP2') ? { http2: true } : null),
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const protocol = isHTTPS ? 'https' : 'http';

  Logger.log(`🚀 Application is running on: ${protocol}://localhost:${port}`);

  configApp.close();
}
bootstrap();
