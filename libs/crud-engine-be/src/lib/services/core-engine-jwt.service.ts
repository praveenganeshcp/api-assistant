import { SessionExpiredException } from "@api-assistant/crud-engine-core";
import { Injectable } from "@nestjs/common";
import { JsonWebTokenError, sign, verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";

@Injectable()
export class CoreEngineJWTService {

    private readonly secret = "secret";

    createToken(userId: string): string {
        return sign({sub: userId}, this.secret);
    }

    validate(token: string): ObjectId {
        try {
            const payload = verify(token, this.secret);
            return new ObjectId(payload.sub as string);
        }
        catch(err) {
            if(err instanceof JsonWebTokenError) {
                throw new SessionExpiredException();
            }
            throw err;
        }
    }
}