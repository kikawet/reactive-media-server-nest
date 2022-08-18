import { Injectable } from '@nestjs/common';
import { Prisma as dbType, Video } from '@prisma/client';
import { DatabaseService } from '@rms/database';
import { UserDto } from '../user';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(private readonly db: DatabaseService) {}

  async videos(
    params: {
      skip?: number;
      take?: number;
      cursor?: dbType.VideoWhereUniqueInput;
      where?: dbType.VideoWhereInput;
      orderBy?: dbType.VideoOrderByWithRelationInput;
    },
    user: UserDto,
  ): Promise<Video[]> {
    const { skip, take, cursor, orderBy } = params;
    let { where } = params;

    if (!user.isAdmin) {
      where = this.addRestrictions(where, user.login);
    }

    return this.db.video.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  private addRestrictions(
    where: dbType.VideoWhereInput | undefined,
    userLogin: string,
  ): dbType.VideoWhereInput {
    const hasAccess: dbType.VideoWhereInput = {
      OR: [
        {
          isPrivate: false,
        },
        {
          isPrivate: true,
          allowedUsers: {
            some: {
              login: userLogin,
            },
          },
        },
      ],
    };

    return where
      ? {
          AND: [where, hasAccess],
        }
      : hasAccess;
  }

  async createVideos(
    data: dbType.VideoCreateManyInput[],
  ): Promise<dbType.BatchPayload> {
    return this.db.video.createMany({ data, skipDuplicates: true });
  }

  video(where: dbType.VideoWhereUniqueInput): Promise<Video | null> {
    return this.db.video.findUnique({ where });
  }

  async isUserAllowed(userLogin: string, videoTitle: string): Promise<boolean> {
    return (
      null !==
      (await this.db.video.findFirst({
        where: {
          OR: [
            {
              title: videoTitle,
              isPrivate: false,
            },
            {
              title: videoTitle,
              allowedUsers: {
                some: {
                  login: userLogin,
                },
              },
            },
          ],
        },
      }))
    );
  }

  update(params: {
    where: dbType.VideoWhereUniqueInput;
    data: dbType.VideoUpdateWithoutViewsInput;
  }): Promise<Video> {
    const { where, data } = params;
    return this.db.video.update({ where, data });
  }
}
