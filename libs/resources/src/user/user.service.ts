import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@rms/database';
import { User, Prisma as dbType } from '@prisma/client';

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
