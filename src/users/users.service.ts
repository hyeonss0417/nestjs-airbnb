import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserRole } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/varification.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const { email } = createUserDto;

    try {
      const exists = await this.userRepository.findOne({ email });
      if (exists) throw new BadRequestException('이미 존재하는 이메일입니다.');

      const user = await this.userRepository.save(
        this.userRepository.create(createUserDto),
      );
      await this.roleRepository.save({ user, role: UserRole.Guest });

      const verification = await this.verificationRepository.save(
        this.verificationRepository.create({ user }),
      );
    } catch (e) {
      return false;
    }
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
}
