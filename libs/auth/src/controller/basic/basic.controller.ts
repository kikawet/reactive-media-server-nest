import {
  Controller,
  forwardRef,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@rms/auth';
import { JwtSkip } from '@rms/auth/decorator';
import { AuthenticatedRequest } from '@rms/auth/dto';
import { BasicAuthGuard } from '@rms/auth/guards';

@Controller('auth/basic')
@JwtSkip()
export class BasicController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Post()
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
