"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCategoryService {
    async execute({ name }) {
        try {
            const categoryAlreadyExists = await prisma_1.default.category.findFirst({
                where: {
                    name,
                },
            });
            if (categoryAlreadyExists) {
                throw new Error("Ja existe uma categoria com esse nome");
            }
            const category = await prisma_1.default.category.create({
                data: {
                    name,
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                },
            });
            return category;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao criar categoria");
        }
    }
}
exports.CreateCategoryService = CreateCategoryService;
//# sourceMappingURL=CreateCategoryService.js.map