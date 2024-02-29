import { Logger } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

export class PasswordManagerService {
  private logger = new Logger(PasswordManagerService.name);

  public hash(plainPassword: string): Promise<string> {
    this.logger.log('Hashing the password');
    return hash(plainPassword, 10);
  }

  public compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    this.logger.log('Comparing the password');
    return compare(plainPassword, hashedPassword);
  }
}
