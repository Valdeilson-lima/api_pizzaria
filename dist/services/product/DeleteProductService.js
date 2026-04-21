"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteProductService {
    async execute({ product_id }) {
        try {
            await prisma_1.default.product.update({
                where: {
                    id: product_id,
                },
                data: {
                    disable: true,
                },
            });
            return { message: "Produto desativado com sucesso" };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao desativar produto");
        }
    }
}
exports.DeleteProductService = DeleteProductService;
//# sourceMappingURL=DeleteProductService.js.map