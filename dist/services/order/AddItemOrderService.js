"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddItemOrderService {
    async execute({ order_id, product_id, amount }) {
        try {
            const order = await prisma_1.default.order.findFirst({
                where: {
                    id: order_id,
                },
                select: {
                    id: true,
                    status: true,
                },
            });
            if (!order) {
                throw new Error("Pedido não encontrado");
            }
            if (order.status) {
                throw new Error("Pedido já foi finalizado");
            }
            const product = await prisma_1.default.product.findFirst({
                where: {
                    id: product_id,
                    disable: false,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
            });
            if (!product) {
                throw new Error("Produto não encontrado");
            }
            const item = await prisma_1.default.orderItem.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount,
                },
                select: {
                    id: true,
                    order_id: true,
                    product_id: true,
                    amount: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            description: true,
                            banner: true,
                        },
                    },
                },
            });
            return item;
        }
        catch (error) {
            throw new Error(error instanceof Error
                ? error.message
                : "Erro ao adicionar item ao pedido");
        }
    }
}
exports.AddItemOrderService = AddItemOrderService;
//# sourceMappingURL=AddItemOrderService.js.map