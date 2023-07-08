
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString, IsNumber, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV!: Environment;

  @IsNumber()
  PORT!: number;

  @IsString()
  DB_URL!: string;

  @IsString()
  DB_NAME!: string;

  @IsString()
  JWT_SECRET!: string;
}

export const ENV_VARIABLES: EnvironmentVariables = plainToInstance(
    EnvironmentVariables,
    process.env,
    { 
        enableImplicitConversion: true,
    },
  );

export function validateEnvVariables(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}