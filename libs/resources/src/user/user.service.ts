import { Injectable } from '@nestjs/common';
import { Prisma as dbType, User } from '@prisma/client';
import { DatabaseService } from '@rms/database';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(data: dbType.UserCreateInput): Promise<User> {
    return this.db.user.create({ data });
  }

  user(where: dbType.UserWhereUniqueInput): Promise<User | null> {
    return this.db.user.findUnique({ where });
  }
}
