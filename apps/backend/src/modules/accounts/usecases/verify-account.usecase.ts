import { CanBeNull, Usecase, valueIsDefined } from "@api-assistant/utils";
import { User, UserDetails } from "../entities/user.entity";
import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "../repository/accounts.repository";
import { InvalidVerificationKeyException } from "../exceptions/accounts.exceptions";
import { JWTService } from "../services/jwt.service";
import { UserDetailsMapper } from "../mappers/user-details.mapper";

const userDetailsMapper = new UserDetailsMapper();

@Injectable()
export class VerifyAccountUsecase 
    implements Usecase<string, {user: UserDetails, token: string}> {

    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly jwtService: JWTService
    ) {}

    public async execute(verificationKey: string): 
        Promise<{ user: UserDetails; token: string; }> {
        const userAccount: CanBeNull<User> = await this.accountsRepository.findOne({
            accountVerificationId: verificationKey,
            isVerified: false,
            isActive: true
        })
        if(!valueIsDefined(userAccount)) {
            throw new InvalidVerificationKeyException();
        }
        await this.accountsRepository.updateOne(
            {_id: userAccount._id}, 
            {$set: {isVerified: true, lastLoggedInOn: new Date()}}
        );
        return {
            user: userDetailsMapper.from(userAccount),
            token: this.jwtService.signToken(userAccount._id.toString())
        }
    }
}