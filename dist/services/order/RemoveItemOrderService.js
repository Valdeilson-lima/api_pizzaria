"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveItemOrderService {
    async execute({ item_id }) {
        try {
            const item = await prisma_1.default.orderItem.findFirst({
                where: {
                    id: item_id,
                },
                select: {
                    id: true,
                },
            });
            if (!item) {
                throw new Error("Item do pedido não encontrado");
            }
            await prisma_1.default.orderItem.delete({
                where: {
                    id: item_id,
                },
            });
            return { message: "Item removido com sucesso" };
        }
        catch (error) {
            throw new Error(error instanceof Error
                ? error.message
                : "Erro ao remover item do pedido");
        }
    }
}
exports.RemoveItemOrderService = RemoveItemOrderService;
//# sourceMappingURL=RemoveItemOrderService.js.map