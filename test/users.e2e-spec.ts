import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { isJWT } from 'class-validator';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { SignInUserDTO } from '../src/users/dto/sign-in-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';
import { RestApiTest, wrapper } from './common/api-test.common';
import { isUser, isArrayOf } from './common/validation.common';

const adminUser: CreateUserDto = {
  firstName: 'Hyeonseong',
  lastName: 'Jeon',
  email: 'admin@gmail.com',
  password: 'admin1234',
  isHost: true,
  isAdmin: true,
  adminSecretKey: 'admin',
};

const guestUser: CreateUserDto = {
  firstName: 'Guest',
  lastName: 'Jeon',
  email: 'guest@gmail.com',
  password: 'asdf1234',
  isHost: false,
};

describe('Users (e2e)', () => {
  let app: INestApplication;
  let apiTest: RestApiTest;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    apiTest = new RestApiTest(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('sign-up', () => {
    const request = wrapper(() =>
      apiTest.bodyCurrying<CreateUserDto>('POST')('/users/sign-up')(),
    );

    it('should create guest account', () => {
      return request(guestUser)
        .expect(201)
        .expect(res => isUser(res.body));
    });
    it('should create admin account', () => {
      return request(adminUser)
        .expect(201)
        .expect(res => isUser(res.body));
    });
    it('should fail if email is invalud', () => {
      return request({ ...guestUser, email: 'wrongEmail' })
        .expect(400)
        .expect(res => {
          expect(res.body.message[0]).toEqual('올바른 이메일을 입력해주세요');
        });
    });
    it('should fail if admin key is wrong', () => {
      return request({
        ...adminUser,
        adminSecretKey: 'wrongSecret',
      })
        .expect(401)
        .expect(res => {
          expect(res.body).toHaveProperty(
            'message',
            '어드민키가 일치하지 않습니다',
          );
        });
    });
    it('should fail if email already registered', () => {
      return request(guestUser)
        .expect(409)
        .expect(res => {
          expect(res.body).toHaveProperty(
            'message',
            '이미 가입된 이메일입니다',
          );
        });
    });
  });

  let adminToken, guestToken;
  const guestId = 1,
    adminId = 2;
  describe('sign-in', () => {
    const request = wrapper(() =>
      apiTest.bodyCurrying<SignInUserDTO>('POST')('/users/sign-in')(),
    );

    it('should sign guest user in', () => {
      return request({ email: guestUser.email, password: guestUser.password })
        .expect(200)
        .expect(res => {
          isJWT(res.body);
          guestToken = res.body.accessToken;
        });
    });
    it('should sign admin user in', () => {
      return request({ email: adminUser.email, password: adminUser.password })
        .expect(200)
        .expect(res => {
          isJWT(res.body);
          adminToken = res.body.accessToken;
        });
    });
    it('should fail if user does not exist', () => {
      return request({ email: 'nope@nope.com', password: guestUser.password })
        .expect(400)
        .expect(res => {
          expect(res.body).toHaveProperty(
            'message',
            '아이디와 비밀번호를 확인해주세요',
          );
        });
    });
    it('should fail if password is wrong', () => {
      return request({ email: guestUser.email, password: 'wrongPassword' })
        .expect(400)
        .expect(res => {
          expect(res.body).toHaveProperty(
            'message',
            '아이디와 비밀번호를 확인해주세요',
          );
        });
    });
  });

  describe('getAllUsers', () => {
    const request = wrapper(() => apiTest.getCurrying('/users'));

    it('should return all users', () => {
      return request(adminToken)
        .expect(200)
        .expect(res => isArrayOf(res.body, isUser));
    });
    it('should fail if token is invalid', () => {
      return request()
        .expect(401)
        .expect(res =>
          expect(res.body).toHaveProperty('message', '로그인이 필요합니다'),
        );
    });
    it('should fail if user is not admin', () => {
      return request(guestToken)
        .expect(403)
        .expect(res =>
          expect(res.body).toHaveProperty('message', 'Forbidden resource'),
        );
    });
  });

  describe('getProfile', () => {
    const request = wrapper(() => apiTest.getCurrying('/users/profile'));

    it(`should return user's profile`, () => {
      return request(adminToken)
        .expect(200)
        .expect(res => isUser(res.body));
    });

    it('should fail if token is invalid', () => {
      return request('')
        .expect(401)
        .expect(res =>
          expect(res.body).toHaveProperty('message', '로그인이 필요합니다'),
        );
    });
  });

  describe('getOtherProfile', () => {
    const request = (id: number) => apiTest.getCurrying(`/users/${id}`)();

    it(`should return user's profile`, () => {
      return request(guestId)
        .expect(200)
        .expect(res => isUser(res.body));
    });
  });

  describe('updateUser', () => {
    const request = (id: number) =>
      apiTest.bodyCurrying<UpdateUserDto>('PATCH')(`/users/${id}`)(guestToken);

    it('should update user profile', () => {
      return request(guestId)({
        bio: 'Hi~',
        firstName: 'Gil-dong',
        lastName: 'Hong',
      }).expect(200);
    });
    it('should fail if other user is trying to update profile', () => {
      return request(adminId)({
        bio: 'Hi~',
        firstName: 'Gil-dong',
        lastName: 'Hong',
      })
        .expect(401)
        .expect(res =>
          expect(res.body).toHaveProperty(
            'message',
            '자신의 프로필만 변결할 수 있습니다',
          ),
        );
    });
  });
});
