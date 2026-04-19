import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";

class RemoveOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const removeOrderService = new RemoveOrderService();

    try {
      const result = await removeOrderService.execute({ order_id });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === "Pedido não encontrado") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Erro ao remover pedido",
      });
    }
  }
}

export { RemoveOrderController };
