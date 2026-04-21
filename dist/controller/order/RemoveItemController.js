"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemController = void 0;
const RemoveItemOrderService_1 = require("../../services/order/RemoveItemOrderService");
class RemoveItemController {
    async handle(req, res) {
        const item_id = req.query.item_id;
        const removeItemOrderService = new RemoveItemOrderService_1.RemoveItemOrderService();
        try {
            const result = await removeItemOrderService.execute({ item_id });
            return res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message === "Item do pedido não encontrado") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao remover item do pedido",
            });
        }
    }
}
exports.RemoveItemController = RemoveItemController;
//# sourceMappingURL=RemoveItemController.js.map