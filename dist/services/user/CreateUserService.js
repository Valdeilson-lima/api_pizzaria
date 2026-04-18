"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ name, email, password }) {
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userAlreadyExists) {
            throw new Error("Usuario já existe");
        }
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            Role: user.role,
            createdAt: user.createdAt,
        };
    }
}
exports.CreateUserService = CreateUserService;
//# sourceMappingURL=CreateUserService.js.map