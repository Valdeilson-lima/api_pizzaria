"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const CreateCategoryService_1 = require("../../services/category/CreateCategoryService");
class CreateCategoryController {
    async handle(req, res) {
        const { name } = req.body;
        const createCategoryService = new CreateCategoryService_1.CreateCategoryService();
        try {
            const category = await createCategoryService.execute({ name: name });
            return res.status(201).json(category);
        }
        catch (error) {
            return res.status(400).json({
                error: error instanceof Error ? error.message : 'Erro ao criar categoria',
            });
        }
    }
}
exports.CreateCategoryController = CreateCategoryController;
//# sourceMappingURL=CrateCategoryController.js.map