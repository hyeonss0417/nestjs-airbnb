import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserRole } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Verification } from '../auth/entities/varification.entity';

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
    return await this.userRepository.findOneOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
