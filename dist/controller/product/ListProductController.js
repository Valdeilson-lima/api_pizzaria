"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductController = void 0;
const ListProductService_1 = require("../../services/product/ListProductService");
class ListProductController {
    async handle(req, res) {
        const disabledQuery = req.query.disabled;
        const disabled = disabledQuery === "true";
        const listProductService = new ListProductService_1.ListProductService();
        try {
            const products = await listProductService.execute({ disabled });
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar produtos",
            });
        }
    }
}
exports.ListProductController = ListProductController;
//# sourceMappingURL=ListProductController.js.map