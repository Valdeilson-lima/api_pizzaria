import { Request, Response } from "express";
import { ListOrdersService } from "../../services/order/ListOrdersService";

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const draftQuery = req.query?.draft as string | undefined;

    const listOrdersService = new ListOrdersService();

    try {
      const orders = await listOrdersService.execute({ draft: draftQuery });

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao listar pedidos",
      });
    }
  }
}

export { ListOrdersController };
