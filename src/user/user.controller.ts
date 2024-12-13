import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}
  @Post('/signup')
  async signup(@Body() payload: CreateUserDto, @Res() res: Response) {
    try {
      const userExit = await this.user.userExits(payload.email);
      if (userExit) {
        return res.status(401).json({
          message: 'User already exits',
        });
      }

      const newUser = await this.user.createUser(payload);

      res.status(201).json({
        message: 'Register Successfully',
        data: {
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
          gender: newUser.gender,
          image: newUser.image,
          created_at: newUser.createdAt,
          updated_at: newUser.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: 'Server Error',
      });
    }
  }
}
