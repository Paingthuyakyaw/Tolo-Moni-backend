import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from 'src/conversation/conversation.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    credentials: false, // Disable credentials for security
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly conversation: ConversationService) {}

  @SubscribeMessage('createConversation')
  async createConversation(
    @MessageBody() users: number[],
    @ConnectedSocket() client: Socket,
  ) {
    const conv = await this.conversation.createConversation(users);

    client.emit('conversationCreated', conv);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @MessageBody()
    data: {
      conversationId: number;
      senderId: number;
      receptionId: number;
      message: string;
    },
  ) {
    const message = await this.conversation.createMessage(data);
    return this.server.emit('messageRecieved', message);
  }

  @SubscribeMessage('getUserConversations')
  async handleGetUserConversations(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const conversations = await this.conversation.getUserConversation(userId);
    client.emit('userConversations', conversations);
  }

  @SubscribeMessage('getMessagesInConversation')
  async handleGetMessagesInConversation(
    @MessageBody() conversationId: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(conversationId, 'id');

    const messages =
      await this.conversation.getMessageInConversation(conversationId);
    client.emit('conversationMessages', messages);
  }
}
