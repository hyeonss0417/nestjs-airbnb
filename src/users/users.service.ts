import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserRole } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/varification.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const { email } = createUserDto;

    const exists = await this.userRepository.findOne({ email });
    if (exists) throw new BadRequestException('이미 존재하는 이메일입니다.');

    const user = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
    await this.roleRepository.save({ user, role: UserRole.Guest });

    const verification = await this.verificationRepository.save(
      this.verificationRepository.create({ user }),
    );
    this.mailService.sendVerificationEmail(email, verification.code);
    return true;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'password'], loadEagerRelations: true },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifyEmail(code: string): Promise<boolean> {
    try {
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
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
