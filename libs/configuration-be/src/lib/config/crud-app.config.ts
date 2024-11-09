import { registerAs } from '@nestjs/config';
import { ENV_VARIABLES } from './env.validator';

export const crudAppConfig = registerAs('crudAppConfig', () => ({
  ROOTDIR: ENV_VARIABLES.CRUD_APP_ROOTDIR,
}));
