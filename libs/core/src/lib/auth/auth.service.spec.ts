import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma';
import { UsersService } from '../users';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const existingEmail = 'existing@email.com';
  const correctPassword = 'temp12345';
  let hashPass: string;

  beforeAll(async () => {
    hashPass = await bcrypt.hash(correctPassword, 8);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    })
      .useMocker(async (token) => {
        if (token === PrismaService) {
          return {
            user: {
              findUnique: jest.fn().mockImplementation((query) => {
                if (query.where.email === existingEmail) {
                  return {
                    email: existingEmail,
                    password: hashPass,
                  };
                }

                return null;
              }),
            },
          };
        }

        return null;
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return existing user object if correct email and password', async () => {
      const existingUser = await service.validateUser(
        existingEmail,
        correctPassword
      );

      expect(existingUser?.email).toEqual(existingEmail);
    });

    it('should return null if not existing email', async () => {
      const existingUser = await service.validateUser(
        'nonexistent@test.com',
        correctPassword
      );

      expect(existingUser).toBeNull();
    });

    it('should return null if incorrect password', async () => {
      const existingUser = await service.validateUser(
        existingEmail,
        'incorrectpass'
      );

      expect(existingUser).toBeNull();
    });
  });
});
