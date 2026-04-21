"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const email_1 = require("../../utils/email");
class AuthUserService {
    async execute({ email, password }) {
        if (!(0, email_1.isValidEmail)(email)) {
            throw new Error("Email inválido");
        }
        const normalizedEmail = (0, email_1.normalizeEmail)(email);
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: normalizedEmail,
            },
        });
        if (!user) {
            throw new Error("Email ou senha incorretos");
        }
        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);
        if (!passwordMatch) {
            throw new Error("Email ou senha incorretos");
        }
        const token = (0, jsonwebtoken_1.sign)({
            userId: user.id,
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d",
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            Role: user.role,
            createdAt: user.createdAt,
            token,
        };
    }
}
exports.AuthUserService = AuthUserService;
//# sourceMappingURL=authUserService.js.map