import { registerAs } from "@nestjs/config";
import { ENV_VARIABLES } from "./env.validator";

export const appConfig = registerAs('app', () => ({
    PORT: ENV_VARIABLES.PORT || 3000
}))