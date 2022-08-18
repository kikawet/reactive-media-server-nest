import {
  Body,
  Controller,
  ForbiddenException,
  forwardRef,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Request,
  Res,
} from '@nestjs/common';
import { Prisma as dbType, Video as VideoModel } from '@prisma/client';
import { AuthenticatedRequest } from '@rms/auth/dto';
import { FastifyReply } from 'fastify';
import { createReadStream } from 'fs';
import { lookup } from 'mime-types';
import { UserService } from '../user';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  private readonly logger = new Logger(VideoController.name);

  constructor(
    private readonly videoService: VideoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Get()
  getAll(@Request() { user }: AuthenticatedRequest): Promise<VideoModel[]> {
    return this.videoService.videos({ take: 3 }, user);
  }

  @Get(':title')
  async getVideoByTitle(
    @Request() { user }: AuthenticatedRequest,
    @Param('title') title: string,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const video = await this.videoService.video({
      title,
    });

    if (video === null)
      throw new NotFoundException(`Video with title '${title}' not found`);

    if (
      !user.isAdmin &&
      !(await this.videoService.isUserAllowed(user.login, title))
    ) {
      throw new ForbiddenException();
    }

    const rx = createReadStream(video.url);
    const responseMimeType = lookup(video.url);
    if (responseMimeType) res.header('Content-Type', responseMimeType);

    return rx;
  }

  @Post()
  createMany(
    @Request() { user }: AuthenticatedRequest,
    @Body(
      new ParseArrayPipe({
        items: CreateVideoDto,
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    )
    videoArray: CreateVideoDto[],
  ) {
    if (!user.isAdmin) {
      throw new ForbiddenException();
    }

    return this.videoService.createVideos(videoArray).then((payload) => {
      return { added: payload.count };
    });
  }

  @Put(':title/allowed')
  async allowedUsers(
    @Request() { user }: AuthenticatedRequest,
    @Param('title') title: string,
    @Body() newVideo: UpdateVideoDto,
  ): Promise<VideoModel> {
    const video = await this.videoService.video({
      title,
    });

    if (video === null)
      throw new NotFoundException(`Video with title '${title}' not found`);

    if (!user.isAdmin) throw new ForbiddenException();

    if (!(await this.userService.findAll(newVideo.allowedUsers)))
      throw new NotFoundException(`At least one login is wrong`);

    const newAllowedUsers: dbType.UserWhereUniqueInput[] =
      newVideo.allowedUsers.map((login) => {
        return { login };
      });

    return this.videoService.update({
      where: {
        title,
      },
      data: {
        allowedUsers: {
          set: newAllowedUsers,
        },
      },
    });
  }
}
