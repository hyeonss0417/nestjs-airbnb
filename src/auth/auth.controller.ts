import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('/verification/:code')
  async verify(@Param('code') code: string) {
    return this.authService.verifyEmail(code);
  }
}
