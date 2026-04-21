"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListProductService {
    async execute({ disabled }) {
        try {
            const products = await prisma_1.default.product.findMany({
                where: {
                    disable: disabled,
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
            throw new Error(error instanceof Error ? error.message : "Erro ao listar produtos");
        }
    }
}
exports.ListProductService = ListProductService;
//# sourceMappingURL=ListProductService.js.map