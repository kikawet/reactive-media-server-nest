import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@rms/auth';
import { JwtSkip } from '@rms/auth/decorator';
import { AuthenticatedRequest } from '@rms/auth/dto';
import { DiscordAuthGuard } from '@rms/auth/guards';

@Controller('auth/discord')
@JwtSkip()
export class DiscordController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @UseGuards(DiscordAuthGuard)
  @Get()
  disordLogin() {
    // Guard redirects
  }

  @UseGuards(DiscordAuthGuard)
  @Get('redirect')
  disordCallback(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
