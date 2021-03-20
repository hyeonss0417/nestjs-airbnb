import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Verification } from '../auth/entities/varification.entity';
import { Repository } from 'typeorm';
import { IPayload } from '../common/interfaces/auth.inferfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  getAccessToken(user: IPayload): string {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async getUserByPayload(payload: IPayload): Promise<User> {
    return await this.userRepository.findOne(payload.id);
  }

  async verifyEmail(code: string): Promise<boolean> {
    const verification = await this.verificationRepository.findOne(
      { code },
      { relations: ['user'] },
    );
    if (!verification)
      throw new BadRequestException('유효하지 않은 코드입니다.');

    verification.user.verified = true;
    await this.userRepository.save(verification.user);
    await this.verificationRepository.delete(verification.id);
    return true;
  }
}
