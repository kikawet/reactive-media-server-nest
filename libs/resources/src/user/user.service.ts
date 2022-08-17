import { Injectable } from '@nestjs/common';
import { Prisma as dbType, User } from '@prisma/client';
import { DatabaseService } from '@rms/database';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(data: dbType.UserCreateInput): Promise<UserDto> {
    return this.db.user.create({
      data,
      select: {
        login: true,
        isAdmin: true,
        password: false,
      },
    });
  }

  user(where: dbType.UserWhereUniqueInput): Promise<User | null> {
    return this.db.user.findUnique({
      where,
    });
  }
}
