import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController {
  async handle(req: Request, res: Response) {
    const disabledQuery = req.query.disabled;
    const disabled = disabledQuery === "true";

    const listProductService = new ListProductService();

    try {
      const products = await listProductService.execute({ disabled });

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao listar produtos",
      });
    }
  }
}

export { ListProductController };
