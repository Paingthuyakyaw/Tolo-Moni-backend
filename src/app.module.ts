import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConversationModule } from './conversation/conversation.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ChatGateway],
  exports: [ChatGateway],
})
export class AppModule {}
