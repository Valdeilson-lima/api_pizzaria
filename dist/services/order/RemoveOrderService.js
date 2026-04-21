"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveOrderService {
    async execute({ order_id }) {
        try {
            const order = await prisma_1.default.order.findFirst({
                where: {
                    id: order_id,
                },
                select: {
                    id: true,
                },
            });
            if (!order) {
                throw new Error("Pedido não encontrado");
            }
            const itemsCount = await prisma_1.default.orderItem.count({
                where: {
                    order_id,
                },
            });
            await prisma_1.default.order.delete({
                where: {
                    id: order_id,
                },
            });
            if (itemsCount > 0) {
                return {
                    message: "Pedido e itens vinculados removidos com sucesso",
                };
            }
            return { message: "Pedido removido com sucesso" };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao remover pedido");
        }
    }
}
exports.RemoveOrderService = RemoveOrderService;
//# sourceMappingURL=RemoveOrderService.js.map