import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  redirect(@Res() res: Response) {
    res.status(302).redirect('/video');
  }
}
