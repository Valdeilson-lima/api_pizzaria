"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailUserService {
    async execute(userId) {
        try {
            const user = await prisma_1.default.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new Error("Usuario não encontrado");
            }
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                Role: user.role,
                createdAt: user.createdAt,
            };
        }
        catch (error) {
            throw new Error("Erro ao detalhar usuário");
        }
    }
}
exports.DetailUserService = DetailUserService;
//# sourceMappingURL=DetailUserService.js.map