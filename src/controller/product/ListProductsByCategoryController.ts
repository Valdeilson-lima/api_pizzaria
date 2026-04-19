import { Request, Response } from "express";
import { ListProductsByCategoryService } from "../../services/product/ListProductsByCategoryService";

class ListProductsByCategoryController {
  async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listProductsByCategoryService = new ListProductsByCategoryService();

    try {
      const products = await listProductsByCategoryService.execute({
        category_id,
      });

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof Error && error.message === "Categoria não encontrada") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Erro ao listar produtos da categoria",
      });
    }
  }
}

export { ListProductsByCategoryController };
