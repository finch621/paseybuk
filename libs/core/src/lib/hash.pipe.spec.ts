import * as bcrypt from 'bcryptjs';
import { HashPipe } from './hash.pipe';

describe('HashPipe', () => {
  const hashPipe = new HashPipe();

  it('should be defined', () => {
    expect(hashPipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return a new user with hash password', async () => {
      const userData = {
        email: 'email@email.com',
        password: 'temp12345',
      };

      const newUser = await hashPipe.transform(userData);

      expect(await bcrypt.compare(userData.password, newUser.password)).toBe(
        true
      );
    });
  });
});
