"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductController = void 0;
const DeleteProductService_1 = require("../../services/product/DeleteProductService");
class DeleteProductController {
    async handle(req, res) {
        const product_id = req.query?.product_id;
        const deleteProductService = new DeleteProductService_1.DeleteProductService();
        try {
            const product = await deleteProductService.execute({ product_id });
            return res.status(200).json(product);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao deletar produto",
            });
        }
    }
}
exports.DeleteProductController = DeleteProductController;
//# sourceMappingURL=DeleteProductControler.js.map