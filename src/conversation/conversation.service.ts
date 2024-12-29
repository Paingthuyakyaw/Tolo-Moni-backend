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
    // Step 1: Find conversation IDs related to the user
    const userConversations = await this.prisma.userCoversation.findMany({
      where: {
        userId: userId,
      },
      select: {
        conversationId: true, // Only fetch the conversationId
      },
    });

    // Extract conversation IDs into an array
    const conversationIds = userConversations.map((uc) => uc.conversationId);

    console.log('Conversation IDs:', conversationIds);

    // Step 2: Fetch conversations and their participants
    return this.prisma.conversation.findMany({
      where: {
        id: { in: conversationIds }, // Filter by matching conversation IDs
      },
      include: {
        participants: {
          where: {
            userId: {
              not: userId,
            },
          },
          include: { user: true }, // Include user details for participants
        },
        message: false, // Include messages in the conversation
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
