import { User } from '@prisma/client';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(paylod: User): Promise<{
        userId: number;
        username: string;
    }>;
}
export {};
