import { SetMetadata } from '@nestjs/common';

export const JWT_SKIP_KEY = 'jwtSkip';
export const JwtSkip = () => SetMetadata(JWT_SKIP_KEY, true);
