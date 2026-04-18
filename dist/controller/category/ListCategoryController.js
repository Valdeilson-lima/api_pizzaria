"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoryController = void 0;
const ListCategoryService_1 = require("../../services/category/ListCategoryService");
class ListCategoryController {
    async handle(_req, res) {
        const listCategoryService = new ListCategoryService_1.ListCategoryService();
        try {
            const categories = await listCategoryService.execute();
            return res.status(200).json(categories);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar categorias",
            });
        }
    }
}
exports.ListCategoryController = ListCategoryController;
//# sourceMappingURL=ListCategoryController.js.map