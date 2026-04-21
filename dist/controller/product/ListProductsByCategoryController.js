"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductsByCategoryController = void 0;
const ListProductsByCategoryService_1 = require("../../services/product/ListProductsByCategoryService");
class ListProductsByCategoryController {
    async handle(req, res) {
        const category_id = req.query.category_id;
        const listProductsByCategoryService = new ListProductsByCategoryService_1.ListProductsByCategoryService();
        try {
            const products = await listProductsByCategoryService.execute({
                category_id,
            });
            return res.status(200).json(products);
        }
        catch (error) {
            if (error instanceof Error && error.message === "Categoria não encontrada") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({
                error: error instanceof Error
                    ? error.message
                    : "Erro ao listar produtos da categoria",
            });
        }
    }
}
exports.ListProductsByCategoryController = ListProductsByCategoryController;
//# sourceMappingURL=ListProductsByCategoryController.js.map