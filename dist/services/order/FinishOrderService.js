"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishOrderService {
    async execute({ order_id }) {
        try {
            const order = await prisma_1.default.order.findFirst({
                where: {
                    id: order_id,
                },
            });
            if (!order) {
                throw new Error("Pedido não encontrado");
            }
            const updatedOrder = await prisma_1.default.order.update({
                where: {
                    id: order_id,
                },
                data: {
                    status: true,
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    status: true,
                    draft: true,
                    createdAt: true,
                },
            });
            return { updatedOrder, message: "Pedido finalizado com sucesso" };
        }
        catch (error) {
            throw new Error("Erro ao finalizar pedido: " +
                (error instanceof Error ? error.message : "Erro desconhecido"));
        }
    }
}
exports.FinishOrderService = FinishOrderService;
//# sourceMappingURL=FinishOrderService.js.map