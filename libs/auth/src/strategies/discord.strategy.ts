import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserDto } from '@rms/resources/user';
import { Profile, Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('DISCORD_ID'),
      clientSecret: configService.get('DISCORD_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACKURL'),
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<UserDto> {
    const newUser = {
      login: profile.email ?? profile.username,
    };

    return this.authService.validateOauth(newUser);
  }
}
