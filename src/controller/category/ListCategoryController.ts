import { Request, Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController {
  async handle(_req: Request, res: Response) {
    const listCategoryService = new ListCategoryService();

    try {
      const categories = await listCategoryService.execute();

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao listar categorias",
      });
    }
  }
}

export { ListCategoryController };
