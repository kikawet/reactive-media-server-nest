import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Video, Prisma } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(private readonly db: PrismaService) {}

  async videos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VideoWhereUniqueInput;
    where?: Prisma.VideoWhereInput;
    orderBy?: Prisma.VideoOrderByWithRelationInput;
  }): Promise<Video[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.video.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createVideos(
    data: Prisma.VideoCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.db.video.createMany({ data, skipDuplicates: true });
  }

  video(where: Prisma.VideoWhereUniqueInput): Promise<Video | null> {
    return this.db.video.findUnique({ where });
  }
}
