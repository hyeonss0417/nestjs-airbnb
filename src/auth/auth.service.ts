import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Verification } from '../auth/entities/varification.entity';
import { Repository } from 'typeorm';
import { IPayload } from './auth.inferfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async validateUser(email: string, password: string): Promise<IPayload> {
    const user = await this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'password'], loadEagerRelations: true },
    );

    if (user && (await user.checkPassword(password))) {
      const { id, email, password } = user;
      return { id, email };
    }

    throw new BadRequestException('아이디 또는 비밀번호가 틀렸습니다.');
  }

  login(user: IPayload) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
