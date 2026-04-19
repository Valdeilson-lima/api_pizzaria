import { Request, Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";

class DetailOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const detailOrderService = new DetailOrderService();

    try {
      const order = await detailOrderService.execute({ order_id });

      return res.status(200).json(order);
    } catch (error) {
      if (error instanceof Error && error.message === "Pedido não encontrado") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({
        error: error instanceof Error ? error.message : "Erro ao detalhar pedido",
      });
    }
  }
}

export { DetailOrderController };
