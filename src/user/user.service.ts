import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data });
  }
}
