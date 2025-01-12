import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    validateUser({ email, password }: {
        email: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
        password: string;
        email: string;
        gender: import("@prisma/client").$Enums.Gender;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: User): Promise<{
        token: string;
        message: string;
        data: {
            userId: number;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
}
