import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppConfigModule } from '@rms/config/app-config.module';
import { DatabaseService } from '@rms/database';
import { FastifyInstance } from 'fastify';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

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

  const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance
    .addHook('onRequest', async (req: any, res) => {
      req.socket['encrypted'] = process.env.NODE_ENV === 'production';
    })
    .decorateReply('setHeader', function (name: string, value: unknown) {
      this.header(name, value);
    })
    .decorateReply('end', function () {
      this.send('');
    });

  const prismaService = app.get(DatabaseService);
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
