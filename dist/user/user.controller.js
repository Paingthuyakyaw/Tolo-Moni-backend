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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const auth_guard_1 = require("../auth/auth.guard");
let UserController = class UserController {
    constructor(user) {
        this.user = user;
    }
    async signup(payload, res) {
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
        }
        catch (err) {
            res.status(500).json({
                message: 'Server Error',
            });
        }
    }
    async getAllUser(payload, res) {
        const { search } = payload;
        console.log(search);
        const users = await this.user.getAllUser(search);
        return res.status(200).json({
            message: 'all users',
            data: users,
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map