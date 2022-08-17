import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from '@rms/auth/guards';
import { UserDto } from '@rms/resources/user';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  @Get()
  redirect(@Res() res: FastifyReply) {
    res.status(302).redirect('/video');
  }

  @UseGuards(BasicAuthGuard)
  @Post('auth/login')
  login(@Request() req: { user: UserDto }) {
    return req.user;
  }
}
