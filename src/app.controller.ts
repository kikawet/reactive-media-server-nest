import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@rms/auth';
import { JwtSkip } from '@rms/auth/decorator';
import { AuthenticatedRequest } from '@rms/auth/dto';
import { BasicAuthGuard } from '@rms/auth/guards';
import { FastifyReply } from 'fastify';

@Controller()
@JwtSkip()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  redirect(@Res() res: FastifyReply) {
    res.status(302).redirect('/video');
  }

  @UseGuards(BasicAuthGuard)
  @Post('auth/login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
