"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOrderController = void 0;
const SendOrderService_1 = require("../../services/order/SendOrderService");
class SendOrderController {
    async handle(req, res) {
        const { order_id, name } = req.body;
        const sendOrderService = new SendOrderService_1.SendOrderService();
        try {
            const order = await sendOrderService.execute({ order_id, name });
            return res.status(200).json(order);
        }
        catch (error) {
            if (error instanceof Error && error.message === "Pedido não encontrado") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao enviar pedido para a cozinha",
            });
        }
    }
}
exports.SendOrderController = SendOrderController;
//# sourceMappingURL=SendOrderController.js.map