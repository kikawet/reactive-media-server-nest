import { Injectable } from '@nestjs/common';
import { UserDto, UserService } from '@rms/resources/user';
import { EncryptionService } from './encryption';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
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
}
