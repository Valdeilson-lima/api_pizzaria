"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderController = void 0;
const DetailOrderService_1 = require("../../services/order/DetailOrderService");
class DetailOrderController {
    async handle(req, res) {
        const order_id = req.query.order_id;
        const detailOrderService = new DetailOrderService_1.DetailOrderService();
        try {
            const order = await detailOrderService.execute({ order_id });
            return res.status(200).json(order);
        }
        catch (error) {
            if (error instanceof Error && error.message === "Pedido não encontrado") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao detalhar pedido",
            });
        }
    }
}
exports.DetailOrderController = DetailOrderController;
//# sourceMappingURL=DetailOrderController.js.map