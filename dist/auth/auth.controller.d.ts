import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        token: string;
        message: string;
        data: {
            userId: number;
            name: string;
            email: string;
            created_at: Date;
        };
    }>;
    profile(req: any): any;
}
