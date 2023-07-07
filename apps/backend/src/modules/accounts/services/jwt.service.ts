import { Injectable } from "@nestjs/common";
import { decode, sign } from "jsonwebtoken";

@Injectable()
export class JWTService {
    public signToken(emailId: string): string {
        return sign({}, "secret", {
            algorithm: "HS512",
            subject: emailId
        })
    }

    public verifyToken(token: string) {
        return decode(token)
    }
}