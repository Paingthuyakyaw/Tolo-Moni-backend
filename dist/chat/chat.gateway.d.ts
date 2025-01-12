import { Server, Socket } from 'socket.io';
import { ConversationService } from 'src/conversation/conversation.service';
export declare class ChatGateway {
    private readonly conversation;
    server: Server;
    constructor(conversation: ConversationService);
    createConversation(users: number[], client: Socket): Promise<void>;
    sendMessage(data: {
        conversationId: number;
        senderId: number;
        receptionId: number;
        message: string;
    }): Promise<boolean>;
    handleGetUserConversations(userId: number, client: Socket): Promise<void>;
    handleGetMessagesInConversation(conversationId: number, client: Socket): Promise<void>;
}
