"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCategoryService {
    async execute() {
        try {
            const categories = await prisma_1.default.category.findMany({
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return categories;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao listar categorias");
        }
    }
}
exports.ListCategoryService = ListCategoryService;
//# sourceMappingURL=ListCategoryService.js.map