import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserRole } from './entities/role.entity';
import { User } from './entities/user.entity';
import { Verification } from '../auth/entities/varification.entity';
import { generateUUIDv4 } from '../common/utils/mail.utils';
import { SignInUserDTO } from './dto/sign-in-user.dto';
import { AuthService } from '../auth/auth.service';
import { ParallelAsync } from '../common/utils/async.utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  async signUp({
    firstName,
    lastName,
    email,
    password,
    isHost,
    isAdmin,
    adminSecretKey,
  }: CreateUserDto): Promise<User> {
    if (isAdmin && adminSecretKey !== process.env.ADMIN_SERET_KEY)
      throw new UnauthorizedException('어드민키가 일치하지 않습니다');

    const exists = await this.userRepository.findOne(
      { email },
      { select: ['id'] },
    );

    if (exists) throw new ConflictException('이미 가입된 이메일입니다');

    const user = await this.userRepository.save(
      this.userRepository.create({ firstName, lastName, email, password }),
    );
    delete user.password;

    const parallelAsync = new ParallelAsync();

    parallelAsync.add(this.roleRepository.save({ user, role: UserRole.Guest }));
    if (isHost)
      parallelAsync.add(
        this.roleRepository.save({ user, role: UserRole.Host }),
      );
    if (isAdmin) {
      parallelAsync.add(
        this.roleRepository.save({ user, role: UserRole.Admin }),
      );
    }

    const emailCode = generateUUIDv4();
    parallelAsync.add(
      this.verificationRepository.save(
        this.verificationRepository.create({ user, code: emailCode }),
      ),
    );

    await parallelAsync.done();

    this.mailService.sendVerificationEmail(email, emailCode);

    return user;
  }

  async signIn({ email, password }: SignInUserDTO): Promise<string> {
    const user = await this.userRepository.findOne(
      { email },
      { select: ['id', 'email', 'password'] },
    );

    if (user && (await user.checkPassword(password))) {
      delete user.password;
      this.userRepository.update(user, { lastLogin: new Date() });
      return this.authService.getAccessToken(user);
    }

    throw new BadRequestException('아이디와 비밀번호를 확인해주세요');
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    await this.userRepository.update(id, updateUserDto);
    return true;
  }

  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
