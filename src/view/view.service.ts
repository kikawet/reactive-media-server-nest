import { Injectable } from '@nestjs/common';
import { Prisma, View } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ViewService {
  constructor(private readonly db: PrismaService) {}

  createView(data: Prisma.ViewCreateInput): Promise<View> {
    return this.db.view.create({ data });
  }

  view(where: Prisma.ViewWhereUniqueInput): Promise<View | null> {
    return this.db.view.findUnique({ where });
  }

  views(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ViewWhereUniqueInput;
    where?: Prisma.ViewWhereInput;
    orderBy?: Prisma.ViewOrderByWithRelationInput;
    select?: Prisma.ViewSelect;
  }): Promise<View[]> {
    return this.db.view.findMany({ ...params });
  }
}
