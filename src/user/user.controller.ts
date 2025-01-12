import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllUser(@Query() payload: { search: string }, @Res() res: Response) {
    const { search } = payload;
    console.log(search);

    const users = await this.user.getAllUser(search);
    return res.status(200).json({
      message: 'all users',
      data: users,
    });
  }
}
