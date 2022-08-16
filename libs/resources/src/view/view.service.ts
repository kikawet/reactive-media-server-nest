import { Injectable } from '@nestjs/common';
import { Prisma as dbType, View } from '@prisma/client';
import { DatabaseService } from '@rms/database';

@Injectable()
export class ViewService {
  constructor(private readonly db: DatabaseService) {}

  createView(data: dbType.ViewCreateInput): Promise<View> {
    return this.db.view.create({ data });
  }

  view(where: dbType.ViewWhereUniqueInput): Promise<View | null> {
    return this.db.view.findUnique({ where });
  }

  views(params: {
    skip?: number;
    take?: number;
    cursor?: dbType.ViewWhereUniqueInput;
    where?: dbType.ViewWhereInput;
    orderBy?: dbType.ViewOrderByWithRelationInput;
    select?: dbType.ViewSelect;
  }): Promise<View[]> {
    return this.db.view.findMany({ ...params });
  }
}
