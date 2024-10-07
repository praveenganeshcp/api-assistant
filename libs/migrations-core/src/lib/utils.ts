import path = require('path');
import { MIGRATIONS_FOLDER } from './types';
import { ObjectId } from 'mongodb';

export function applicationMigrationFolder(application: ObjectId): string {
  return path.join(process.cwd(), MIGRATIONS_FOLDER, application.toString());
}
