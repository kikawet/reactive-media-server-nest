import { Module } from '@nestjs/common';
import { UserModule } from '@rms/resources/user';
import { AuthService } from './auth.service';
import { EncryptionModule } from './encryption/encryption.module';
import { BasicStrategy } from './strategies/basic.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '@rms/config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards';

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
  ],
  providers: [
    AuthService,
    BasicStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
