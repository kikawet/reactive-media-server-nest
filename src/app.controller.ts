import { Controller, Get, Res } from '@nestjs/common';
import { JwtSkip } from '@rms/auth/decorator';
import { FastifyReply } from 'fastify';

@Controller()
@JwtSkip()
export class AppController {
  @Get()
  redirect(@Res() res: FastifyReply) {
    res.status(302).redirect('/video');
  }
}
