"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConversationService = class ConversationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConversation(participant) {
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
    async createMessage({ conversationId, senderId, receptionId, message, }) {
        return this.prisma.message.create({
            data: {
                conversationId,
                senderId,
                receptionId,
                message,
            },
        });
    }
    async getUserConversation(userId) {
        const userConversations = await this.prisma.userCoversation.findMany({
            where: {
                userId: userId,
            },
            select: {
                conversationId: true,
            },
        });
        const conversationIds = userConversations.map((uc) => uc.conversationId);
        console.log('Conversation IDs:', conversationIds);
        return this.prisma.conversation.findMany({
            where: {
                id: { in: conversationIds },
            },
            include: {
                participants: {
                    where: {
                        userId: {
                            not: userId,
                        },
                    },
                    include: { user: true },
                },
                message: false,
            },
        });
    }
    async getMessageInConversation(conversationId) {
        return this.prisma.message.findMany({
            where: {
                conversationId,
            },
        });
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map