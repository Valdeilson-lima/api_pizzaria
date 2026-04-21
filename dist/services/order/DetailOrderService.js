"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailOrderService {
    async execute({ order_id }) {
        try {
            const order = await prisma_1.default.order.findFirst({
                where: {
                    id: order_id,
                },
                select: {
                    id: true,
                    table: true,
                    name: true,
                    status: true,
                    draft: true,
                    createdAt: true,
                    updatedAt: true,
                    items: {
                        select: {
                            id: true,
                            amount: true,
                            order_id: true,
                            product_id: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    price: true,
                                    banner: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!order) {
                throw new Error("Pedido não encontrado");
            }
            return order;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao detalhar pedido");
        }
    }
}
exports.DetailOrderService = DetailOrderService;
//# sourceMappingURL=DetailOrderService.js.map