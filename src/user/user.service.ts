import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const hashPassword = await hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashPassword },
    });
  }

  async userExits(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async getAllUser(search: string) {
    return this.prisma.user.findMany({
      where: {
        email: search,
      },
    });
  }
}
