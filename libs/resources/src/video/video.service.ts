import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@rms/database';
import { Video, Prisma as dbType } from '@prisma/client';

@Injectable()
export class VideoService {
  constructor(private readonly db: DatabaseService) {}

  async videos(params: {
    skip?: number;
    take?: number;
    cursor?: dbType.VideoWhereUniqueInput;
    where?: dbType.VideoWhereInput;
    orderBy?: dbType.VideoOrderByWithRelationInput;
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
    data: dbType.VideoCreateManyInput[],
  ): Promise<dbType.BatchPayload> {
    return this.db.video.createMany({ data, skipDuplicates: true });
  }

  video(where: dbType.VideoWhereUniqueInput): Promise<Video | null> {
    return this.db.video.findUnique({ where });
  }
}
