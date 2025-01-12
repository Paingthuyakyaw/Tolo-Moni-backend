import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<{
        id: number;
        username: string;
        password: string;
        email: string;
        gender: import("@prisma/client").$Enums.Gender;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    userExits(email: string): Promise<{
        id: number;
        username: string;
        password: string;
        email: string;
        gender: import("@prisma/client").$Enums.Gender;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUser(search: string): Promise<{
        id: number;
        username: string;
        password: string;
        email: string;
        gender: import("@prisma/client").$Enums.Gender;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
