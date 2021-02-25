import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { Verification } from './entities/varification.entity';
import {
  mockJwtService,
  mockMailService,
  mockRepository,
} from '../common/mocks/services.mock';
import { MockRepository } from '../common/mocks/interfaces.mock';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userRepository: MockRepository<User>;
  let verificationRepository: MockRepository<Verification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
        {
          provide: MailService,
          useValue: mockMailService(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get(getRepositoryToken(User));
    verificationRepository = module.get(getRepositoryToken(Verification));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    const loginArgs = {
      email: 'test@email.com',
      password: 'testPassword123!',
    };

    it('should fail if user does not exist', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(
        service.validateUser(loginArgs.email, loginArgs.password),
      ).rejects.toThrow('아이디 또는 비밀번호가 틀렸습니다.');

      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
    });

    it('should fail if the password is wrong', async () => {
      const mockedUser = {
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      userRepository.findOne.mockResolvedValue(mockedUser);

      await expect(
        service.validateUser(loginArgs.email, loginArgs.password),
      ).rejects.toThrow('아이디 또는 비밀번호가 틀렸습니다.');
    });

    it('should return token if the password is correct', async () => {
      const mockedUser = {
        id: 1,
        email: loginArgs.email,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      userRepository.findOne.mockResolvedValue(mockedUser);

      const result = await service.validateUser(
        loginArgs.email,
        loginArgs.password,
      );

      expect(result).toEqual({
        id: 1,
        email: 'test@email.com',
      });
    });
  });

  describe('login', () => {
    const payload = {
      id: 1,
      email: 'testPassword123!',
    };

    it('should return jwt access token', async () => {
      const result = service.login(payload);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({
        access_token: 'jwt-token',
      });
    });
  });

  describe('getUserByPayload', () => {
    const payload = {
      id: 1,
      email: 'testPassword123!',
    };

    it('should return jwt access token', async () => {
      const result = await service.getUserByPayload(payload);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledWith(expect.any(Number));
    });
  });

  describe('verifyEmail', () => {
    it('should fail on verificaiton not found', async () => {
      verificationRepository.findOne.mockResolvedValue(undefined);

      await expect(service.verifyEmail('')).rejects.toThrow(
        '유효하지 않은 코드입니다.',
      );
    });

    it('should verify email', async () => {
      const mockedVerification = {
        user: {
          verified: false,
        },
        id: 1,
      };
      verificationRepository.findOne.mockResolvedValue(mockedVerification);

      const result = await service.verifyEmail('');

      expect(verificationRepository.findOne).toHaveBeenCalledTimes(1);
      expect(verificationRepository.findOne).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object),
      );
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledWith({ verified: true });

      expect(verificationRepository.delete).toHaveBeenCalledTimes(1);
      expect(verificationRepository.delete).toHaveBeenCalledWith(
        mockedVerification.id,
      );

      expect(result).toEqual(true);
    });
  });
});
