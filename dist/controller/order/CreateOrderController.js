"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const CreateOrderService_1 = require("../../services/order/CreateOrderService");
class CreateOrderController {
    async handle(req, res) {
        const { table, name } = req.body;
        const createOrderService = new CreateOrderService_1.CreateOrderService();
        try {
            const order = await createOrderService.execute({ table: Number(table), name });
            return res.status(201).json(order);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao criar pedido",
            });
        }
    }
}
exports.CreateOrderController = CreateOrderController;
//# sourceMappingURL=CreateOrderController.js.map