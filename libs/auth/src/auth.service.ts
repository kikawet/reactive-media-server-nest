import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto, UserService } from '@rms/resources/user';
import { JwtPayload } from './dto/jwt-payload.dto';
import { EncryptionService } from './encryption';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.userService.user({ login: username });
    const isValid =
      user !== null &&
      (await this.encryptionService.compare(password, user.password));

    if (isValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserDto) {
    const payload: JwtPayload = {
      sub: user.login,
      username: user.login,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
