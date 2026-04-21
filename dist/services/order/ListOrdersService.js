"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrdersService {
    async execute({ draft }) {
        const orders = await prisma_1.default.order.findMany({
            where: {
                draft: draft === "true" ? true : false,
            },
            select: {
                id: true,
                table: true,
                name: true,
                status: true,
                draft: true,
                createdAt: true,
                items: {
                    select: {
                        id: true,
                        amount: true,
                        product_id: true,
                        order_id: true,
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
            orderBy: {
                createdAt: "desc",
            },
        });
        return orders;
    }
}
exports.ListOrdersService = ListOrdersService;
//# sourceMappingURL=ListOrdersService.js.map