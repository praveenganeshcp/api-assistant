import { CanBeNull } from "@api-assistant/utils";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { appConfig } from "apps/backend/src/config/app.config";
import { verify, sign, JwtPayload, SignOptions } from "jsonwebtoken";

@Injectable()
export class JWTService {

    private readonly jwtSecret: string;

    private readonly JWT_ALGORITHM: SignOptions['algorithm'] = "HS512";

    private readonly TOKEN_EXPIRES_IN: string = '1d';

    constructor(
        @Inject(appConfig.KEY) private applicationConfig: ConfigType<typeof appConfig>
    ) {
        this.jwtSecret = applicationConfig.JWT_SECRET;
    }

    public signToken(userId: string): string {
        return sign({}, this.jwtSecret, {
            algorithm: this.JWT_ALGORITHM,
            subject: userId,
            expiresIn: this.TOKEN_EXPIRES_IN
        })
    }

    public verifyToken(token: string): CanBeNull<JwtPayload> {
        return verify(token, this.jwtSecret) as JwtPayload;
    }
}