import { Request, Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query?.product_id as string;

    const deleteProductService = new DeleteProductService();

    try {
      const product = await deleteProductService.execute({ product_id });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao deletar produto",
      });
    }
  }
}

export { DeleteProductController };
