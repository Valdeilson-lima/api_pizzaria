"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersController = void 0;
const ListOrdersService_1 = require("../../services/order/ListOrdersService");
class ListOrdersController {
    async handle(req, res) {
        const draftQuery = req.query?.draft;
        const listOrdersService = new ListOrdersService_1.ListOrdersService();
        try {
            const orders = await listOrdersService.execute({ draft: draftQuery });
            return res.status(200).json(orders);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar pedidos",
            });
        }
    }
}
exports.ListOrdersController = ListOrdersController;
//# sourceMappingURL=ListOrdersController.js.map