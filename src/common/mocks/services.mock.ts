export const mockRepository = () => ({
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

export const mockJwtService = () => ({
  sign: jest.fn(() => 'jwt-token'),
});

export const mockMailService = () => ({
  sendVerificationEmail: jest.fn(),
});
