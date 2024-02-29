import { createHash } from 'crypto';

export function createPasswordResetKey(emailId: string): string {
  return createHash('sha256')
    .update(emailId + Date.now())
    .digest('hex');
}
