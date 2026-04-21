"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOrderController = void 0;
const RemoveOrderService_1 = require("../../services/order/RemoveOrderService");
class RemoveOrderController {
    async handle(req, res) {
        const order_id = req.query.order_id;
        const removeOrderService = new RemoveOrderService_1.RemoveOrderService();
        try {
            const result = await removeOrderService.execute({ order_id });
            return res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error && error.message === "Pedido não encontrado") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao remover pedido",
            });
        }
    }
}
exports.RemoveOrderController = RemoveOrderController;
//# sourceMappingURL=RemoveOrderController.js.map