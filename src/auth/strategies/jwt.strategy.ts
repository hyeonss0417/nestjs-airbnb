import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../common/constants/auth.constants';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<User> {
    const user: User = await this.authService.getUserByPayload(payload);
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');
    // if (!user.verified)
    //   throw new BadRequestException('이메일 인증을 완료해주세요.');
    return user;
  }
}
