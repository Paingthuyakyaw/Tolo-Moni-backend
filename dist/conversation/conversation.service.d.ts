import { PrismaService } from 'src/prisma/prisma.service';
export declare class ConversationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createConversation(participant: number[]): Promise<{
        participants: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            conversationId: number;
            userId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createMessage({ conversationId, senderId, receptionId, message, }: {
        conversationId: number;
        senderId: number;
        receptionId: number;
        message: string;
    }): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        receptionId: number;
        conversationId: number;
        senderId: number;
    }>;
    getUserConversation(userId: number): Promise<({
        participants: ({
            user: {
                id: number;
                username: string;
                password: string;
                email: string;
                gender: import("@prisma/client").$Enums.Gender;
                image: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            conversationId: number;
            userId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getMessageInConversation(conversationId: number): Promise<{
        message: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        receptionId: number;
        conversationId: number;
        senderId: number;
    }[]>;
}
