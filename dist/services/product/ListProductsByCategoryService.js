"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsByCategoryService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListProductsByCategoryService {
    async execute({ category_id }) {
        try {
            const category = await prisma_1.default.category.findFirst({
                where: {
                    id: category_id,
                },
                select: {
                    id: true,
                },
            });
            if (!category) {
                throw new Error("Categoria não encontrada");
            }
            const products = await prisma_1.default.product.findMany({
                where: {
                    category_id,
                    disable: false,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    banner: true,
                    disable: true,
                    category_id: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return products;
        }
        catch (error) {
            throw new Error(error instanceof Error
                ? error.message
                : "Erro ao listar produtos da categoria");
        }
    }
}
exports.ListProductsByCategoryService = ListProductsByCategoryService;
//# sourceMappingURL=ListProductsByCategoryService.js.map