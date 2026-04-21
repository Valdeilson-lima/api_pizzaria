"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateOrderService {
    async execute({ table, name }) {
        try {
            const existingOrderForTable = await prisma_1.default.order.findFirst({
                where: {
                    table,
                    status: false,
                },
                select: {
                    id: true,
                },
            });
            if (existingOrderForTable) {
                throw new Error("Ja existe um pedido ativo para esta mesa");
            }
            const order = await prisma_1.default.order.create({
                data: {
                    table,
                    name,
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
            return order;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Erro ao criar pedido");
        }
    }
}
exports.CreateOrderService = CreateOrderService;
//# sourceMappingURL=CreateOrderService.js.map