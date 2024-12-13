import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: User) {
    return {
      token: this.jwtService.sign({ username: user.username, sub: user.id }),
      message: 'Login Success',
    };
  }
}
