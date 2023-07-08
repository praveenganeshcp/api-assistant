import { hash, compare } from "bcrypt";

export class PasswordManagerService {

    public hash(plainPassword: string): Promise<string> {
        return hash(plainPassword, 10);
    }

    public compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return compare(plainPassword, hashedPassword);
    }

}