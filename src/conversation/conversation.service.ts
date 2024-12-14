import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async createConversation(participant: number[]) {
    const conversation = await this.prisma.conversation.create({
      data: {
        participants: {
          create: participant?.map((userId) => ({ userId })),
        },
      },
      include: {
        participants: true,
      },
    });
    return conversation;
  }

  async createMessage({
    conversationId,
    senderId,
    receptionId,
    message,
  }: {
    conversationId: number;
    senderId: number;
    receptionId: number;
    message: string;
  }) {
    return this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        receptionId,
        message,
      },
    });
  }

  async getUserConversation(userId: number) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
          include: { user: true },
        },
        message: true,
      },
    });
  }

  async getMessageInConversation(conversationId: number) {
    return this.prisma.message.findMany({
      where: {
        conversationId,
      },
    });
  }
}
