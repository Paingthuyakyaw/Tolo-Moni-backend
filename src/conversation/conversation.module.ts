import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ConversationService],
  controllers: [ConversationController],
  imports: [PrismaModule],
  exports: [ConversationService],
})
export class ConversationModule {}
