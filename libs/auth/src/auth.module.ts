import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '@rms/config';
import { UserModule } from '@rms/resources/user';
import { AuthService } from './auth.service';
import { ControllerModule } from './controller/controller.module';
import { EncryptionModule } from './encryption/encryption.module';
import { JwtAuthGuard } from './guards';
import { BasicStrategy } from './strategies/basic.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    EncryptionModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
    ControllerModule,
  ],
  providers: [
    AuthService,
    BasicStrategy,
    JwtStrategy,
    DiscordStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
