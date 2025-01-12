import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly user;
    constructor(user: UserService);
    signup(payload: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUser(payload: {
        search: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
}
