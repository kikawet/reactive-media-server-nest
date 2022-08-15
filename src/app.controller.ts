import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  @Get()
  redirect(@Res() res: FastifyReply) {
    res.status(302).redirect('/video');
  }
}
