"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemController = void 0;
const AddItemOrderService_1 = require("../../services/order/AddItemOrderService");
class AddItemController {
    async handle(req, res) {
        const { order_id, product_id, amount } = req.body;
        const addItemOrderService = new AddItemOrderService_1.AddItemOrderService();
        try {
            const item = await addItemOrderService.execute({
                order_id,
                product_id,
                amount,
            });
            return res.status(201).json(item);
        }
        catch (error) {
            if (error instanceof Error &&
                (error.message === "Pedido não encontrado" ||
                    error.message === "Produto não encontrado")) {
                return res.status(404).json({ error: error.message });
            }
            if (error instanceof Error &&
                error.message === "Pedido já foi finalizado") {
                return res.status(400).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao adicionar item ao pedido",
            });
        }
    }
}
exports.AddItemController = AddItemController;
//# sourceMappingURL=AddItemController.js.map